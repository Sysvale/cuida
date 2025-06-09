<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		v-cdstip="tooltipConfig"
		class="tooltip"
		:data-tippy-placement="position"
		:data-tippy-content="content"
		:data-tippy-allowHTML="true"
	>
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * O posicionamento do Tooltip. A prop aceita as opções: top, right, bottom e left.
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
	},

	computed: {
		tooltipConfig() {
			return {
				content: this.slim
					? `<span style="font-size: 11px; padding: 0px;">${this.text}</span>`
					: `<span style="font-size: 13px; padding: 0px 2px">${this.text}</span>`,
				options: {
					placement: this.position,
					theme: 'light',
					arrow: true,
					delay: 100,
					animation: 'shift-away-subtle',
					allowHTML: true,
					onShow: (instance) => {
						const tippyBox = instance.popper.querySelector('.tippy-box');
						if (tippyBox) {
							tippyBox.style.borderRadius = this.resolveBorderRadius;
						}
					},
				},
			};
		},

		resolveBorderRadius() {
			return this.rounded ? '20px' : '8px';
		},
	},
};
</script>

<style lang="scss">
@use '../assets/sass/tokens/index' as tokens;

.tooltip {
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
