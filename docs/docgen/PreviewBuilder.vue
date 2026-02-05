<template>
	<PreviewContainer :with-background>
		<component
			:is="component"
			v-if="!$slots.container && !withTrigger"
			v-bind="{...$attrs, ...((model as Record<string, any>) || {}) }"
			v-on="internalEvents"
		>
			<template
				v-for="(_, slotName) in $slots"
				#[slotName]="slotProps"
			>
				<slot
					v-if="slotProps"
					:name="slotName"
					v-bind="slotProps"
				/>
			</template>
		</component>

		<div v-else-if="withTrigger">
			<CdsButton
				:id="$attrs.id || $attrs.targetId"
				:text="`Toggle ${component.name || component}`"
				style="margin: 12px 0px"
				@button-click="emits('trigger-click')"
			/>

			<component
				:is="component"
				v-bind="{...$attrs, ...((model as Record<string, any>) || {}) }"
				v-on="internalEvents"
			>
				<template
					v-for="(_, slotName) in $slots"
					#[slotName]="slotProps"
				>
					<slot
						v-if="slotProps"
						:name="slotName"
						v-bind="slotProps"
					/>
				</template>
			</component>
		</div>

		<LogBuilder
			ref="logBuilderRef"
			:events
		/>
	</PreviewContainer>

	<PlaygroundBuilder
		v-if="!static"
		:component="(component.name ?? component) as string"
		:args="model"
	/>
</template>

<script setup lang="ts">
import {
	ref,
	useTemplateRef,
	onMounted,
	type Component,
} from 'vue';
import PlaygroundBuilder from './PlaygroundBuilder.vue';
import PreviewContainer from './PreviewContainer.vue';
import LogBuilder from './LogBuilder.vue';

const model = defineModel<Record<string, any>>('args');

const props = withDefaults(defineProps<{
	component: Component & { name: string },
	events: string[],
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
	const eventListeners = logBuilder.value?.createEventListeners() ?? {};

	if (!props.events) {
		internalEvents.value = eventListeners;
		return;
	}

	const updateModelListeners = props.events
		.filter((eventName) => eventName.startsWith('update:'))
		.reduce((accumulator, eventName) => {
			const modelKey = eventName.slice('update:'.length);
			const currentListener = eventListeners[eventName];

			accumulator[eventName] = (...eventArgs: unknown[]) => {
				if (model.value && typeof model.value === 'object') {
					(model.value as Record<string, unknown>)[modelKey] = eventArgs[0];
				}

				if (typeof currentListener === 'function') {
					currentListener(...eventArgs);
				}
			};

			return accumulator;
		// eslint-disable-next-line no-unused-vars
		}, {} as Record<string, (...eventArgs: unknown[]) => void>);

	internalEvents.value = {
		...eventListeners,
		...updateModelListeners,
	};
});

export type PreviewBuilderType = typeof import('./PreviewBuilder.vue')['default'];
</script>
