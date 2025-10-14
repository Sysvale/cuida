<template>
	<div>
		<span
			v-if="events?.length"
			class="show-log-button"
			@click="showLog = !showLog"
		>
			{{ logButtonText }}
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
</template>

<script setup lang="ts">
import { ref, useTemplateRef, computed, watch, nextTick } from 'vue';

type LogEntry = {
	event: string;
	payload: any;
	timestamp: string;
};

const props = defineProps<{
	events: string[] | undefined,
}>();

const logContainer = useTemplateRef('logContainerRef');
const showLog = ref(false);
const log = ref<LogEntry[]>([]);

const logButtonText = computed(() => {
	return showLog.value ? 'Ocultar log' : 'Mostrar log'
});

const addLogEntry = (event: string, payload: any) => {
	log.value.push({
		event,
		payload,
		timestamp: new Date().toTimeString().split(' ')[0]
	});
};

watch(log.value, () => {
	if (logContainer.value) {
		nextTick(() => {
			logContainer.value?.scrollTo({
				top: logContainer.value.scrollHeight,
				behavior: 'smooth',
			});
		});
	}
}, { deep: true });

function createEventListeners() {
	const listeners: Record<string, Function> = {};

	props.events?.forEach((event) => {
		listeners[event] = (ev: any) => {
			addLogEntry(event, ev);
		};
	});

	return listeners;
};

defineExpose({
	addLogEntry,
	createEventListeners,
	clearLog: () => log.value = []
});

export type LogBuilderType = typeof import("./LogBuilder.vue")["default"];
</script>

<style lang="scss" scoped>
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
	z-index: 2;
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
