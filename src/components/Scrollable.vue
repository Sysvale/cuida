<template>
	<span
		id="scrollable"
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
	</span>
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
@import '../assets/sass/tokens.scss';

#scrollable .scrollable {
	&__container {
		overflow-y: auto;
		overflow-x: hidden;
		padding: pr(1);

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
			background: $n-40;
			border-radius: 8px;
		}

		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background: $n-50;
		}

		&--horizontal {
			overflow-x: auto;
		}
	}
}
</style>
