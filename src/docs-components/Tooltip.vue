<template>
	<span
		id="tooltip"
		class="tooltip__container"
		:class="visibilityController ? 'tooltip__container--active' : 'tooltip__container--inactive'"
	>
		<!-- @slot Slot usado para especificar o texto que receberá o highlight. -->
		<slot />
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * Controla a visibilidade do componente.
		 */
		show: {
			type: Boolean,
			default: false,
		},
		/**
		 * Indica o elemento no DOM associado ao tooltip. Ele deve existir para que o tooltip seja mostrado.
		 */
		target: {
			type: String,
			default: '',
		},
	},
	data: function () {
		return {
			visibilityController: this.show,
		}
	},

	watch: {
		show(oldV, newV) {
			if (this.show) {
				this.visibilityController = true;
				let tooltip = document.getElementById('tooltip');
				const offsets = document.getElementById(this.target).getBoundingClientRect();

				tooltip.style.transition = 'none';
				tooltip.style.top = (document.getElementById(this.target).getBoundingClientRect().top + window.pageYOffset) + 'px';

				let targetWidth = parseFloat(window.getComputedStyle(document.getElementById(this.target)).width);
				let tooltipWidth = parseFloat(window.getComputedStyle(document.getElementById('tooltip')).width);
				tooltip.style.left = (((targetWidth - tooltipWidth) / 2) + offsets.left) + 'px';

				tooltip.style.transition = 'opacity .3s';

				tooltip.style.top = (document.getElementById(this.target).getBoundingClientRect().top + window.pageYOffset - 30) + 'px'

				setTimeout(() => {
					this.visibilityController = false;
					tooltip.style.transition = 'none';
					tooltip.style.top = (document.getElementById(this.target).getBoundingClientRect().top + window.pageYOffset) + 'px';

					this.$emit('hide', true);
				}, 850);
			}
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.tooltip__container {
	border-radius: 16px;
	background-size: 200%;
	background-color: $n-900;
	color: $n-0;
	position: absolute;
	padding: pYX(1, 3);
	margin: mt(0);
	@include caption;

	&--active {
		opacity: 1;
	}

	&--inactive {
		opacity: 0;
	}

	z-index: 999;
}

</style>
