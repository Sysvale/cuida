<template>
	<div
		class="floating-action-button"
		:class="`floating-action-button--${variant}`"
	>
		<icon
			:name="icon"
			height="20"
			width="20"
		/>
	</div>
</template>

<script setup>
import Icon from '../components/Icon.vue';

const props = defineProps({
	/**
	 * Define a variante de cor do botão. São 9 variantes implementadas: 'green', 'teal',
	 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray' e 'dark'.
	 */
	variant: {
		type: String,
		default: 'green',
	},
	/**
	 * Define o ícone do botão.
	 */
	icon: {
		type: String,
		default: 'plus-outline',
	},
});

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.floating-action-button {
	position: absolute;
	bottom: 0;
	right: 0;
	margin: 0 16px 20px 0;
	border-radius: $border-radius-medium;
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: pa(3);
	color: white;
	box-shadow: $shadow-md;
	cursor: pointer;
	transition: background-color 0.2s ease;

	@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		background-color: $base-color;
	}

	&:active::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: $border-radius-medium;
	}
}

</style>
