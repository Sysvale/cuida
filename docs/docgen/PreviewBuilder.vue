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

		<LogBuilder ref="logBuilderRef" :events />
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
	onMounted,
	type Component
} from 'vue';
import PlaygroundBuilder from './PlaygroundBuilder.vue';
import PreviewContainer from './PreviewContainer.vue';
import LogBuilder from './LogBuilder.vue';

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


console.log('component: ', props.component);
console.log('component: ', props.component.name);

const emits = defineEmits(['trigger-click']);

const logBuilder = useTemplateRef('logBuilderRef');

const internalEvents = ref({});

onMounted(() => {
	internalEvents.value = logBuilder.value.createEventListeners();
});

export type PreviewBuilderType = typeof import("./PreviewBuilder.vue")["default"];
</script>
