<template>
	<div class="demo-container">
		<component
			:is="component"
			v-on="events"
			v-bind="componentProps"
		/>

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
import { ref, useTemplateRef, watch, nextTick, computed, type Component } from 'vue';

interface LogEntry {
	event: string
	payload: unknown
	timestamp: string
}

const props = defineProps<{
	component: Component,
	events: Record<string, (event: any) => void>,
	log: LogEntry[],
	componentProps: Record<string, any>,
}>();

const logContainer = useTemplateRef('logContainerRef');
const showLog = ref(false);

const logButtonText = computed(() => {
	return showLog.value ? 'Ocultar log' : 'Mostrar log'
});

watch(
	() => props.log,
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
