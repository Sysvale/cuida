<template>
	<div
		v-cdstip="text"
		class="tp"
		:data-tippy-placement="position"
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
	},
}
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';
.tp {
	width: fit-content;
}

.tippy-box {
	border-radius: $border-radius-extra-large !important;
	background-color: $n-900 !important;
	color: $n-0 !important;
	padding: px(1) !important;
	font-size: 12px !important;
	font-weight: $font-weight-semibold !important;
}
</style>