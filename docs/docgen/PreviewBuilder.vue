<template>
	<PreviewContainer :withBackground>
		<component
			v-if="!$slots.container && !withTrigger"
			:is="component"
			v-on="internalEvents"
			v-bind="{...$attrs, ...model }"
			v-model="model.modelValue"
		>
			<template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
				<slot v-if="slotProps" :name="slotName" v-bind="slotProps" />
			</template>
		</component>

		<div v-else-if="withTrigger">
			<CdsButton
				:id="$attrs.id || $attrs.targetId"
				:text="`Toggle ${component.name}`"
				style="margin: 12px 0px"
				@button-click="emits('trigger-click')"
			/>

			<component
				:is="component"
				v-on="internalEvents"
				v-bind="{...$attrs, ...model }"
				v-model="model.modelValue"
			>
				<template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
					<slot v-if="slotProps" :name="slotName" v-bind="slotProps" />
				</template>
			</component>
		</div>

		<span
			v-if="events"
			class="show-log-button"
			@click="showLog = !showLog"
		>
			{{logButtonText}}
		</span>

		<div
			v-show="showLog"
			class="log-container"
			ref="logContainerRef"
		>
			<template v-if="!log.length">
				<CdsFlexbox fluid align="center" justify="center">
					<CdsBadge variant="gray">
						⚡Nenhum evento foi disparado
					</CdsBadge>
				</CdsFlexbox>
			</template>

			<template v-for="message in log">
				<div class="log-text">
					<div>
						<small class="log-event">
							@{{ message.event }}: 
						</small>
						<small>
							{{ JSON.stringify(message.payload, null, 2) }} <i>(payload)</i>
							<!-- <pre>{{ message.payload }}</pre> <i>(payload)</i> -->
						</small>
					</div>
					<small>
						{{ message.timestamp }}
					</small>
				</div>
			</template>
		</div>
	</PreviewContainer>

	<PlaygroundBuilder
		v-if="!static"
		:component="component.name"
		:args="model"
	/>
</template>

<script setup lang="ts">
import {
	ref,
	useTemplateRef,
	watch,
	nextTick,
	computed,
	onMounted,
	useAttrs,
	type Component
} from 'vue';
import CdsBadge from '@/components/Badge.vue'
import CdsButton from '@/components/Button.vue'
import CdsFlexbox from '@/components/Flexbox.vue'
import PlaygroundBuilder from './PlaygroundBuilder.vue';
import PreviewContainer from './PreviewContainer.vue';

type LogEntry = {
	event: string;
	payload: any;
	timestamp: string;
};

const model = defineModel('args');

const props = withDefaults(defineProps<{
	/**
	 * Instância do componente vue
	 */
	component: Component & { name: string },
	events?: string[],
	withBackground?: boolean,
	withTrigger?: boolean,
	static?: boolean,
}>(), {
	withTrigger: false,
	withBackground: false,
	static: false,
});

const emits = defineEmits(['trigger-click']);

const $attrs = useAttrs();

const logContainer = useTemplateRef('logContainerRef');
const showLog = ref(false);
const componentProps = ref({});
const log = ref<LogEntry[]>([]);
const internalEvents = ref({});

const logButtonText = computed(() => {
	return showLog.value ? 'Ocultar log' : 'Mostrar log'
});

function handleUpdate (payload) {
	componentProps.value = payload;
};

watch(
	log.value,
	() => {
		if (logContainer.value) {
			nextTick(() => {
				logContainer.value?.scrollTo({
					top: logContainer.value.scrollHeight,
					behavior: 'smooth',
				});
			});
		}
	},
	{ deep: true }
);

watch(() => $attrs, () => {
	console.log('no args');
	componentProps.value = {...$attrs, ...componentProps.value };
}, { immediate: true, deep: true });

onMounted(() => {
	componentProps.value = $attrs;
	props.events?.forEach((event) => {
		internalEvents.value[event] = (ev) => {
			log.value.push({
				event,
				payload: ev,
				timestamp: new Date().toTimeString().split(' ')[0]
			})
		};
	});
});

export type PreviewBuilderType = typeof import("./PreviewBuilder.vue")["default"];
</script>

<style scoped>
.show-log-button {
	padding: 4px 8px;
	color: black;
	background-color: #fff;
	border-top: 1px solid #DFE5EC;
	border-left: 1px solid #DFE5EC;
	position: absolute;
	right: 0;
	font-size: 12px;
	border-radius: 6px 0px 12px 0px;
	cursor: pointer;
	margin-bottom: 4px;
	font-weight: 650;
	bottom: -4px;
}

.log-container {
	padding: 20px;
	border-top: 1px solid #DFE5EC;
	margin: 22px 0;
	max-height: 150px;
	overflow: scroll;
	scrollbar-width: none;
	-ms-overflow-style: none;
}

.log-event {
	font-weight: bold;
	color: #2C70CD;
}

.log-text {
	display: flex;
	padding: 2px 0px;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}
</style>
