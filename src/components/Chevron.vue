<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		ref="chevron"
		:class="{
			'chevron--top': innerDirection === 'top',
			'chevron--right': innerDirection === 'right',
			'chevron--bottom': innerDirection === 'bottom',
			'chevron--left': innerDirection === 'left',
			'chevron--sm': size === 'sm',
			'chevron--md': size === 'md',
			'chevron--lg': size === 'lg',
			'chevron--light': light === true,
		}"
		@click="animationResolver"
	/>
</template>

<script>
export default {
	props: {
		/**
		 * Indica em que direção o Chevron vai ser renderizado. As opções são: 'Top', 'Right', 'Bottom' e 'Left'
		 */
		direction: {
			type: String,
			default: 'bottom',
		},
		/**
		 * Quando true, torna o chevron mais claro
		 */
		light: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica o tamanho do Chevron. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * Ativa animação na transição das posições do Chevron
		 */
		animate: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			innerDirection: this.direction,
		};
	},

	methods: {
		animationResolver() {
			if (!this.animate) return;

			switch(this.innerDirection) {
				case 'top':
					this.innerDirection = 'bottom';
					break;
				case 'bottom':
					this.innerDirection = 'top';
					break;
				case 'right':
					this.innerDirection = 'left';
					break;
				case 'left':
					this.innerDirection = 'right';
					break;
				default:
					this.innerDirection = 'bottom';
			}
		},
	},
};
</script>
<style lang="scss">
@import '../assets/sass/tokens.scss';

.chevron {
	display: flex;
	height: 16px;
	width: 16px;
	justify-content: center;
	align-items: center;
	padding: pa(1);
	transition: all 300ms ease-in-out;

	&::before,
	&::after {
		content: '';
	}

	&::before {
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid $n-300;
		border-radius: $border-radius-small;
		transition: all 300ms ease-in-out;
	}

	&--sm {
		&::before {
			scale: 1;
		}
	}

	&--md {
		&::before {
			scale: 1.3;
		}
	}

	&--lg {
		&::before {
			scale: 1.6;
		}
	}

	&--light {
		&::before {
			border-bottom: 6px solid $n-100;
		}
	}

	&--top {
		@extend .chevron;

		&::before {
			transform: rotate(0deg);
		}
	}

	&--right {
		@extend .chevron;

		&::before {
			transform: rotate(90deg);
		}
	}

	&--bottom {
		@extend .chevron;

		&::before {
			transform: rotate(-180deg);
		}
	}

	&--left {
		@extend .chevron;

		&::before {
			transform: rotate(-90deg);
		}
	}
}
</style>
