<template>
	<PreviewContainer :withBackground>
		<component
			v-if="!$slots.container && !withTrigger"
			:is="component"
			v-on="internalEvents"
			v-bind="{...$attrs, ...(model || {}) }"
		>
			<template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
				<slot v-if="slotProps" :name="slotName" v-bind="slotProps" />
			</template>
		</component>

		<div v-else-if="withTrigger">
			<CdsButton
				:id="$attrs.id || $attrs.targetId"
				:text="`Toggle ${component}`"
				style="margin: 12px 0px"
				@button-click="emits('trigger-click')"
			/>

			<component
				:is="component"
				v-on="internalEvents"
				v-bind="{...$attrs, ...(model || {}) }"
			>
				<template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
					<slot v-if="slotProps" :name="slotName" v-bind="slotProps" />
				</template>
			</component>
		</div>

		<LogBuilder ref="logBuilderRef" :events />
	</PreviewContainer>

	<PlaygroundBuilder
		v-if="!static"
		:component="component"
		:args="model"
	/>
</template>

<script setup lang="ts">
import {
	ref,
	useTemplateRef,
	onMounted,
	type Component
} from 'vue';
import PlaygroundBuilder from './PlaygroundBuilder.vue';
import PreviewContainer from './PreviewContainer.vue';
import LogBuilder from './LogBuilder.vue';

const model = defineModel('args');

const props = withDefaults(defineProps<{
	component: string,
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

const logBuilder = useTemplateRef('logBuilderRef');

const internalEvents = ref({});

onMounted(() => {
	if (logBuilder.value) {
		internalEvents.value = logBuilder.value.createEventListeners();
	}
});

export type PreviewBuilderType = typeof import("./PreviewBuilder.vue")["default"];
</script>
