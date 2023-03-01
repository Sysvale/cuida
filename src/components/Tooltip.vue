<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		v-cdstip="text"
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
		}
	},

	computed: {
		content() {
			return this.slim ? `<span style="font-size: 11px; padding: 0px;">${this.text}</span>`
				: `<span style="font-size: 13px; padding: 0px 2px">${this.text}</span>`;
		},
	},
}
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';
.tooltip {
	width: fit-content;
}

.tippy-box {
	border-radius: $border-radius-extra-large !important;
	background-color: $n-900 !important;
	color: $n-0 !important;
	display: flex;
	align-items: center;
	font-weight: $font-weight-semibold !important;
	font-family: Satoshi, Inter, Avenir, Helvetica, Arial, sans-serif;
}
</style>