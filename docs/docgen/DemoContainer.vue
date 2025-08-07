<template>
	<div>
		<div class="demo-container">
			<component
				:is="component"
				v-on="innerEvents"
				v-bind="componentProps"
			>
				<template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
		  			<slot :name="slotName" v-bind="slotProps" />
				</template>
			</component>
	
			<span
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
							</small>
						</div>
						<small>
							{{ message.timestamp }}
						</small>
					</div>
				</template>
			</div>
		</div>
	
		<PlaygroundBuilder
			:component="component.name"
			@update="handleUpdate"
		/>
	</div>
</template>

<script setup lang="ts">
import {
	ref,
	useTemplateRef,
	watch,
	nextTick,
	computed,
	onMounted,
	type Component
} from 'vue';
import CdsBadge from '@/components/Badge.vue'
import CdsFlexbox from '@/components/Flexbox.vue'
import PlaygroundBuilder from './PlaygroundBuilder.vue';

type LogEntry = {
	event: string;
	payload: any;
	timestamp: string;
};

const props = defineProps<{
	component: Component & { name: string },
	events: string[],
}>();

const logContainer = useTemplateRef('logContainerRef');
const showLog = ref(false);
const componentProps = ref({});
const log = ref<LogEntry[]>([]);
const innerEvents = ref({});

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

onMounted(() => {
	props.events.forEach((event) => {
		innerEvents.value[event] = (ev) => {
			log.value.push({
				event,
				payload: ev,
				timestamp: new Date().toTimeString().split(' ')[0]
			})
		};
	});
});
</script>

<style scoped>
.demo-container {
	position: relative;
	padding: 20px;
	border: 1px solid #DFE5EC;
	border-radius: 12px;
	margin: 16px 0;
}

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
