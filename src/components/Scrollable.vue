<template>
	<div
		class="scrollable"
	>
		<div
			:class="[
				'scrollable__container',
				{ 'scrollable__container--horizontal': horizontalScroll }
			]"
			:style="{
				'max-height': maxHeight,
				'height': autoHeight ? 'auto' : maxHeight,
			}"
		>
			<!-- @slot Slot com o conteúdo que você deseja que seja scrollable -->
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * Altura máxima do container até ser scrollado
		 */
		maxHeight: {
			type: String,
			default: '300px',
			required: true,
		},
		/**
		 * Define altura como 'auto' para o container até o limite máximo
		 */
		autoHeight: {
			type: Boolean,
			default: false,
		},
		/**
		 * Torna o container scrollável horizontalmente
		 */
		horizontalScroll: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.scrollable {
	display: contents;
	&__container {
		overflow-y: auto;
		overflow-x: hidden;
		padding: 1px;

		/* width */
		&::-webkit-scrollbar {
			width: 6px;
            height: 6px;
			border-radius: 8px;
		}

		/* Track */
		&::-webkit-scrollbar-track {
			background: transparent;
		}

		/* Handle */
		&::-webkit-scrollbar-thumb {
			background: tokens.$n-40;
			border-radius: 8px;
		}

		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background: tokens.$n-50;
		}

		&--horizontal {
			overflow-x: auto;
		}
	}
}

@media (max-width: 992px) {
	.scrollable__container::-webkit-scrollbar {
		display: none;
	}
}
</style>
