<template>
	<div>
		<vue-slider
			v-bind="attrs"
			v-model="internalValue"
			:enable-cross="false"
			:min="min"
			:max="max"
		>
			<template v-slot:tooltip="tooltip">
				<!-- @slot Scoped slot para renderização customizada dos tooltips.
					A propriedade 'tooltip', que pode ser acessada através do slot,
					contém pos (posição do componente em %), index (o índice do slider),
					value (o valor do slider), focus (se o slider está no estado de focus ou não),
					disabled (se o slider está disabilitado ou não)
				-->
				<slot
					name="tooltip"
					:tooltip="tooltip"
				/>
			</template>
			<template
				v-if="hasProcessSlot"
				v-slot:process="process"
			>
				<!-- @slot Scoped slot para renderização customizada do process.
					A propriedade 'process', que pode ser acessada através do slot,
					contém start (posição  inicial do slider), end (posição final do slider),
					index (índice do slider - pode ser usado no multiprogress),
					style (informações de estilo sobre o slider)
				-->
				<slot
					name="process"
					:process="process"
				/>
			</template>
		</vue-slider>
	</div>
</template>
<script>
export default {
	props: {
		/**
		 * O valor mínimo do slider.
		 */
		min: {
			type: Number,
			default: 0,
			required: true,
		},
		/**
		 * O valor máximo do slider.
		 */
		max: {
			type: Number,
			default: 100,
			required: true,
		},
		/**
		* Prop utilizada como v-model. Retorna as posições selecionadas no slider.
		*/
		value: {
			type: Array,
			default: () => [],
			required: true,
		},
	},
	data() {
		return {
			internalValue: this.value,
		};
	},
	computed: {
		attrs() {
			const {
				min,
				max,
				value,
				...attrs
			} = this.$attrs;

			return attrs;
		},
		hasProcessSlot() {
			return !!this.$scopedSlots.process;
		},
	},
	watch: {
		internalValue(newValue) {
			this.$emit('input', newValue);
		},
	},
};
</script>
<style lang="scss">
@import '../assets/sass/app.scss';
/* component style */
.vue-slider-disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

/* rail style */
.vue-slider-rail {
	background-color: $n-40;
	border-radius: 15px;
}

/* process style */
.vue-slider-process {
	border-radius: 15px;
	background: $bn-100;
}

/* mark style */
.vue-slider-mark {
	z-index: 4;
}

.vue-slider-mark:first-child .vue-slider-mark-step, .vue-slider-mark:last-child .vue-slider-mark-step {
	display: none;
}

.vue-slider-mark-step {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.16);
}

.vue-slider-mark-label {
	font-size: 14px;
	white-space: nowrap;
}

.vue-slider-dot {
	width: 16px!important;
	height: 16px!important;
}

/* dot style */
.vue-slider-dot-handle {
	cursor: pointer;
	width: 100%;
	height: 100%;
	border: 2px solid $bn-200;
	border-radius: 50%;
	background-color: $bn-100;
	box-sizing: border-box;
	box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
}

.vue-slider-dot-handle-focus {
	box-shadow: 0px 0px 1px 2px rgba(52, 152, 219, 0.36);
}

.vue-slider-dot-handle-disabled {
	cursor: not-allowed;
	background-color: #ccc;
}

.vue-slider-dot-tooltip-inner {
	font-size: 14px;
	white-space: nowrap;
	padding: 2px 5px;
	min-width: 20px;
	text-align: center;
	color: #fff;
	border-radius: 5px;
	border-color: #3498db;
	background-color: #3498db;
	box-sizing: content-box;
}

.vue-slider-dot-tooltip-inner::after {
	content: "";
	position: absolute;
}

.vue-slider-dot-tooltip-inner-top::after {
	top: 100%;
	left: 50%;
	transform: translate(-50%, 0);
	height: 0;
	width: 0;
	border-color: transparent;
	border-style: solid;
	border-width: 5px;
	border-top-color: inherit;
}

.vue-slider-dot-tooltip-inner-bottom::after {
	bottom: 100%;
	left: 50%;
	transform: translate(-50%, 0);
	height: 0;
	width: 0;
	border-color: transparent;
	border-style: solid;
	border-width: 5px;
	border-bottom-color: inherit;
}

.vue-slider-dot-tooltip-inner-left::after {
	left: 100%;
	top: 50%;
	transform: translate(0, -50%);
	height: 0;
	width: 0;
	border-color: transparent;
	border-style: solid;
	border-width: 5px;
	border-left-color: inherit;
}

.vue-slider-dot-tooltip-inner-right::after {
	right: 100%;
	top: 50%;
	transform: translate(0, -50%);
	height: 0;
	width: 0;
	border-color: transparent;
	border-style: solid;
	border-width: 5px;
	border-right-color: inherit;
}

.vue-slider-dot-tooltip-wrapper {
	opacity: 0;
	transition: all 0.3s;
}

.vue-slider-dot-tooltip-wrapper-show {
	opacity: 1;
}

.vue-slider-component .vue-slider {
	background-color: $bn-100 !important;
}

.vue-slider-component .vue-slider-process {
	background-color: $bn-200 !important;
}

.vue-slider-component .vue-slider-dot .vue-slider-dot-handle {
	background-color: $bn-100 !important;
	border: 2px solid $bn-300 !important;
}

.vue-slider-dot-handle {
	
	box-shadow: none !important;
}
.vue-slider-component .vue-slider-dot .vue-slider-dot-handle {
	box-shadow: none !important;
}

.vue-slider {
	height: 3px !important;
}

.vue-slider-component .vue-slider-tooltip {
	border: none !important;
	background-color: transparent !important;
	color: $n-600 !important;
	margin: mb(n2) !important;
	@include caption;
}

.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-top
.vue-slider-tooltip::before,
.vue-slider-component .vue-slider-tooltip-top
.vue-merged-tooltip .vue-slider-tooltip::before {
	border: none !important;
}

.vue-slider-dot-tooltip-inner {
	background-color: transparent;
	border-color: transparent;
	color: #000;
}

.vue-slider-process {
	background-color: $bn-200;
	border-radius: 15px;
}

.merge-tooltip {
	position: absolute;
	left: 50%;
	bottom: 100%;
	transform: translate(-50%, -15px);
}
</style>
