<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div :class="['slider', `slider--${variant}`]">
		<CdsFlexbox fluid justify="space-between" style="margin-bottom: -12px;">
			<CdsText no-margin as="caption">{{ min }}</CdsText>
	
			<CdsText no-margin as="caption">{{ Number(modelValue.toFixed(2)) }} / {{ max }}</CdsText>
		</CdsFlexbox>
		<div class="vue-slider-rail">
			<div
				class="vue-slider-process"
				:style="processStyle"
			></div>

			<div
				v-if="isRange && showMergeTooltip"
				:class="[
					'merge-tooltip',
					'vue-slider-dot-tooltip-inner',
					'vue-slider-dot-tooltip-inner-top',
				]"
			>
				<span v-if="innerValue[0] !== innerValue[1]">
					{{ innerValue[0] }} - {{ innerValue[1] }}
				</span>
				<span v-else>
					{{ innerValue[0] }}
				</span>
			</div>

			<input
				type="range"
				:min="min"
				:max="max"
				:step="step"
				:value="isRange ? innerValue[0] : innerValue"
				@input="onInput($event, 0)"
				class="range-input range-input--first"
			/>
			<input
				v-if="isRange"
				type="range"
				:min="min"
				:max="max"
				:step="step"
				:value="innerValue[1]"
				@input="onInput($event, 1)"
				class="range-input range-input--second"
			/>
		</div>

		<template v-if="isRange">
			<template v-for="(val, index) in innerValue" :key="index">
				<slot
					name="tooltip"
					:tooltip="{
						pos: ((val - min) / (max - min)) * 100,
						index,
						value: val,
						focus: false,
						disabled: false
					}"
				></slot>
			</template>
		</template>
		<template v-else>
			<slot
				name="tooltip"
				:tooltip="{
					pos: ((innerValue - min) / (max - min)) * 100,
					index: 0,
					value: innerValue,
					focus: false,
					disabled: false
				}"
			></slot>
		</template>
	</div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import CdsFlexBox from './Flexbox.vue';
import CdsText from './Text.vue';

const props = defineProps({
	min: {
		type: Number,
		default: 0,
		required: true,
	},
	max: {
		type: Number,
		default: 100,
		required: true,
	},
	modelValue: {
		type: [Array, Number],
		default: () => [0, 100],
		required: true,
	},
	variant: {
		type: String,
		default: 'green',
	},
	step: {
		type: Number,
		default: 1,
		validator: (value) => value > 0,
	},
	withText: {
		type: Boolean,
		default: false,
	}
});

const emit = defineEmits(['update:modelValue']);

const innerValue = ref(props.modelValue);

const isRange = computed(() => Array.isArray(innerValue.value));

const showMergeTooltip = computed(() => {
	return isRange.value && innerValue.value[1] - innerValue.value[0] < 10;
});

// Função para arredondar valores de acordo com o step
const roundToStep = (value) => {
	const steps = Math.round((value - props.min) / props.step);
	return props.min + (steps * props.step);
};

const processStyle = computed(() => {
	const clamp = (v, a = 0, b = 100) => Math.min(Math.max(v, a), b);
	if (isRange.value) {
		const left = ((innerValue.value[0] - props.min) / (props.max - props.min)) * 100;
		const right = ((innerValue.value[1] - props.min) / (props.max - props.min)) * 100;
		const l = clamp(left);
		const r = clamp(right);
		return {
			left: `${l}%`,
			width: `${Math.max(0, r - l)}%`,
		};
	} else {
		const pos = ((innerValue.value - props.min) / (props.max - props.min)) * 100;
		return {
			left: 0,
			width: `${clamp(pos)}%`,
		};
	}
});

const onInput = (e, index) => {
	let val = Number(e.target.value);
	
	// Arredonda o valor de acordo com o step
	val = roundToStep(val);
	
	// Garante que o valor está dentro dos limites
	val = Math.min(Math.max(val, props.min), props.max);
	
	if (isRange.value) {
		const newValue = [Number(innerValue.value[0]), Number(innerValue.value[1])];
		newValue[index] = val;
		
		// Garante que o primeiro valor não seja maior que o segundo
		if (newValue[0] > newValue[1]) {
			[newValue[0], newValue[1]] = [newValue[1], newValue[0]];
		}
		
		innerValue.value = newValue;
	} else {
		innerValue.value = val;
	}
};

// Garante que o valor inicial está alinhado com o step
const normalizeInitialValue = (value) => {
	if (Array.isArray(value)) {
		return value.map(v => roundToStep(v));
	}
	return roundToStep(value);
};

watch(
	() => props.modelValue,
	(val) => {
		const normalizedVal = normalizeInitialValue(val);
		innerValue.value = Array.isArray(normalizedVal) ? [...normalizedVal] : normalizedVal;
	},
	{ immediate: true }
);

watch(innerValue, (val) => {
	emit('update:modelValue', Number(val.toFixed(2)));
}, { deep: true });
</script>

<style lang="scss">
@use '../assets/sass/tokens/index' as tokens;

.slider {
	width: 100%;
	min-width: 266px;
}

.vue-slider-rail {
	position: relative;
	height: 5px;
	margin: 18px 0;
	background-color: tokens.$n-40;
	border-radius: 999px;
}

.vue-slider-process {
	position: absolute;
	top: 0;
	height: 100%;
	background-color: tokens.$n-300;
	border-radius: 999px;
}

.range-input {
	-webkit-appearance: none;
	appearance: none;
	position: absolute;
	left: 0;
	width: 100%;
	height: 100%;
	margin: 0;
	background: transparent;
	pointer-events: auto;
	z-index: 2;
}

.range-input--first {
	z-index: 3;
}

.range-input::-webkit-slider-runnable-track {
	height: 3px;
	background: transparent;
}
.range-input::-moz-range-track {
	height: 3px;
	background: transparent;
}

.range-input::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: tokens.$n-50;
	box-shadow: none;
	margin-top: -7.5px;
	cursor: pointer;
	position: relative;
	z-index: 4;
}
.range-input::-moz-range-thumb {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: tokens.$n-50;
	box-shadow: none;
	cursor: pointer;
	position: relative;
	z-index: 4;
}

.vue-slider-dot-tooltip-top {
	top: tokens.spacer(n1);
}

.vue-slider-dot-tooltip-inner {
	@include tokens.caption;
	background-color: transparent;
	border-color: transparent;
	color: tokens.$n-800;
}

.merge-tooltip {
	position: absolute;
	left: 50%;
	bottom: 100%;
	transform: translate(-50%, -15px);
	z-index: 5;
}

.slider {
	@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		& > .vue-slider-rail > .vue-slider-process {
			background-color: $base-color !important;
		}

		& > .vue-slider-rail > .range-input::-webkit-slider-thumb,
		& > .vue-slider-rail > .range-input::-moz-range-thumb {
			border-color: $shade-500 !important;
		}
	}

	& > .vue-slider-rail > .range-input::-webkit-slider-thumb,
	& > .vue-slider-rail > .range-input::-moz-range-thumb {
		background-color: tokens.$n-0 !important;
		box-shadow: none;
	}
}
</style>
