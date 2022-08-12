<template>
	<span
		id="scrollable"
	>
		<div
			class="scrollable__container"
			:class="horizontalClass"
			:style="{
				'max-height': maxHeight,
				'max-width': maxWidth,
				'height': maxHeight,
				'width': maxWidth,
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
		/**
		 * Altura máxima do container até ser scrollado
		 */
		maxWidth: {
			type: String,
			default: '400px',
			required: true,
		},
		/**
		 * Define scroll como horizontal
		 */
		horizontal: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		horizontalClass() {
			return this.horizontal ? 'horizontal' : '';
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

#scrollable .scrollable {
	&__container {
		overflow-y: auto;
		overflow-x: hidden;

		&.horizontal {
            height: auto;
            display: flex;
            align-items: center;
			overflow-y: hidden !important;
			overflow-x: auto !important;
            gap: 12px;

            &::-webkit-scrollbar {
			    height: 6px;
		    }
		}

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
			background: $n-40;
			border-radius: 8px;
		}

		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background: $n-50;
		}
	}
}
</style>