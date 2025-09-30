<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		v-cdstip="tooltipConfig"
		class="tooltip-width"
		:data-tippy-placement="position"
		:data-tippy-allowHTML="true"
	>
		<slot />
	</div>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'Tooltip' });

const props = defineProps({
	/**
	 * O posicionamento do Tooltip. A prop aceita as opções: top, right, bottom e left.
	 * @values auto, auto-start, auto-end, top, top-start, top-end, right, right-start, right-end, bottom, bottom-start, bottom-end, left, left-start, left-end
	 */
	position: {
		type: String,
		default: 'top',
	},
	/**
	 * Texto do Tooltip
	 */
	text: {
		type: String,
		default: null,
	},
	/**
	 * Quando marcada como true, deixa o texto e o tamanho do tooltip menores.
	 */
	slim: {
		type: Boolean,
		default: false,
	},
	/**
	 * Define o arredondamento da borda do tooltip.
	 */
	rounded: {
		type: Boolean,
		default: true,
	},
	/**
	 * Define como o tooltip é acionado.
	 * @values hover, click
	 */
	trigger: {
		type: String,
		default: 'hover',
		validator: (value) => ['hover', 'click'].includes(value),
	},
});

const resolveBorderRadius = computed(() => {
	return props.rounded ? '20px' : '8px';
});

const tooltipConfig = computed(() => {
	return {
		content: props.slim
			? `<span style="font-size: 11px; padding: 0px;">${props.text}</span>`
			: `<span style="font-size: 13px; padding: 0px 2px">${props.text}</span>`,
		options: {
			placement: props.position,
			theme: 'light',
			arrow: true,
			delay: 100,
			animation: 'shift-away-subtle',
			allowHTML: true,
			trigger: props.trigger === 'hover' ? 'mouseenter focus' : 'click',
			onShow: (instance) => {
				const tippyBox = instance.popper.querySelector('.tippy-box');
				if (tippyBox) {
					tippyBox.style.borderRadius = resolveBorderRadius.value;
				}

				if (props.trigger === 'click') {
					setTimeout(() => {
						instance.hide();
					}, 1000);
				}
			},
		},
	};
});
</script>

<style lang="scss">
@use '../assets/sass/tokens/index' as tokens;

.tooltip-width {
	width: fit-content;
}

.tippy-box {
	background-color: tokens.$n-900 !important;
	color: tokens.$n-0 !important;
	display: flex;
	align-items: center;
	font-weight: tokens.$font-weight-semibold !important;
	font-family: Satoshi, Inter, Avenir, Helvetica, Arial, sans-serif;
}

.tippy-arrow {
	display: none !important;
}
</style>
