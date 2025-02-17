<template>
	<div class="floating-action-button__container">
		<div
			v-for="subitem in 3"
			:key="subitem"
			class="floating-action-button__subitem"
		>
			<icon
				name="home-outline"
				height="32"
				width="32"
			/>
		</div>

		<div
			class="floating-action-button__main-button"
			:class="`floating-action-button__main-button--${variant}`"
		>
			<icon
				:name="icon"
				height="20"
				width="20"
			/>
		</div>
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

	&__container {
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 0 16px 20px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: spacer(3);
	}

	&__main-button {
		position: relative;
		border-radius: $border-radius-medium;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: pa(3);
		color: $n-0;
		box-shadow: $shadow-md;
		cursor: pointer;
		transition: background-color 0.2s ease;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: $base-color;
		}

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.1);
			border-radius: $border-radius-medium;
			opacity: 0;
			transition: opacity 0.2s ease;
		}

		&:active::before {
			opacity: 1;
		}
	}

	&__subitem {
		position: relative;
		border-radius: $border-radius-small;
		width: 30px;
		height: 30px;
		margin: mt(n1);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: pa(2);
		background-color: $n-0;
		color: $n-800;
		box-shadow: $shadow-sm;
		cursor: pointer;
		transition: background-color 0.2s ease;

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.1);
			border-radius: $border-radius-small;
			opacity: 0;
			transition: opacity 0.2s ease;
		}

		&:active::before {
			opacity: 1;
		}
	}
}

</style>
