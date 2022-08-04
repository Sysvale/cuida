<template>
	<div class="progress">
		<div
			class="
				progress-bar
				bg-success
				progress-bar-striped progress-bar-animated
			"
			style="width: 100%"
		></div>
	</div>
</template>

<script>
import { colorOptions } from '../utils/constants/colors';

const sizeOptions = ['sm', 'md', 'lg'];

export default {
	props: {
		/**
		 *	Propriedade referente ao tamanho do componente ('sm', 'md' ou 'lg')
		 *
		 */
		size: {
			type: String,
			default: 'md',
			validator: (value) => sizeOptions.indexOf(value) > -1,
		},
		/**
		*	Variante de cor do componente ('turquoise', 'green', 'blue',
			'indigo', 'violet', 'pink', 'red', 'orange', 'amber')
		*
		*/
		variant: {
			type: String,
			default: 'green',
			validator: (value) => colorOptions.indexOf(value) > -1,
		},
	},

	computed: {
		computedSizeClass() {
			return `spinner--${this.size}`;
		},
		computedColorClass() {
			return `spinner--${this.variant}`;
		},
		computedSpinnerClass() {
			return `${this.computedSizeClass} ${this.computedColorClass}`;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';
</style>
