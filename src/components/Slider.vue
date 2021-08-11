<template>
	<div>
		<vue-slider
			v-bind="$attrs"
			:enable-cross="false"
			:min="min"
			:max="max"
			:value="value"
			@input="valueChanged"
		/>
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
	methods: {
		valueChanged(value) {
			/**
			 * Evento utilizado para implementar o v-model.
			* @event input
			* @type {Event}
			*/
			this.$emit('input', value);
		}
	},
}
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
	background-color: #ccc;
	border-radius: 15px;
}
/* process style */
.vue-slider-process {
	border-radius: 15px;
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
/* dot style */
.vue-slider-dot-handle {
	cursor: pointer;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: #fff;
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
	background-color: $azul-sonic-light-2 !important;
}
.vue-slider-component .vue-slider-process {
	background-color: $azul-sonic-light-1 !important;
}
.vue-slider-component .vue-slider-dot .vue-slider-dot-handle {
	background-color: $azul-sonic-light-2 !important;
	border: 1px solid $azul-sonic-light-1 !important;
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
	color: $cinza-6 !important;
	margin: mb(n2) !important;
	@include legenda;
}
.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-top
.vue-slider-tooltip::before,
.vue-slider-component .vue-slider-tooltip-top
.vue-merged-tooltip .vue-slider-tooltip::before {
	border: none !important;
}
</style>
