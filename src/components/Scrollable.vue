<template>
	<span
		id="scrollable"
	>
		<div
			class="scrollable__container"
			:style="{
				'max-height': maxHeight,
				'height': maxHeight,
			}"
		>
			<!-- @slot Slot com o conteúdo que você deseja que seja scrollable -->
			<slot></slot>
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
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

#scrollable .scrollable {
	&__container {
		overflow-y: auto;
		/* width */
		&::-webkit-scrollbar {
			width: 6px;
			border-radius: 8px;
		}

		/* Track */
		&::-webkit-scrollbar-track {
			background: transparent;
		}

		/* Handle */
		&::-webkit-scrollbar-thumb {
			background: $cinza-4;
			border-radius: 8px;
		}

		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background: $cinza-5;
		}
	}

}
</style>
