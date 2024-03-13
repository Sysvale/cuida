<template>
	<div
		class="skeleton__container"
		:style="computedStyle"
	/>
</template>

<script>
export default {
	props: {
		/**
         * Largura do skeleton
         */
		width: {
			type: String,
			default: '20',
		},

		/**
         * Altura do skeleton
         */
		height: {
			type: String,
			default: '16',
		},

		/**
		 *  Ajusta de acordo com o componente pai. Não se aplica ao shape 'circle'
		 */
		fluid: {
			type: Boolean,
			default: false,
		},

		/**
		 * Indica o shape do elemento. São duas opções: circle, square
		 */
		shape: {
			type: String,
			default: 'square',
			validate: (value) => ['circle', 'square'].includes(value),
		}
	},

	computed: {
		computedStyle() {
			if (this.shape === 'circle') {
				return {
					'--width': `${this.width}px`,
					'--height': `${this.width}px`,
				}
			}

			if (this.fluid) {
				return {
					'--width': '100%',
					'--height': this.height !== '16'
						? `${this.height}px`
						: '100%',
				};
			}

			return  {
				'--width': `${this.width}px`,
				'--height': `${this.height}px`,
			};
		},

		resolveShape() {
			return this.shape === 'circle' ? '50%' : '6px';
		},
	},
}
</script>

<style lang="scss" scoped>
	@import '../assets/sass/tokens.scss';

	.skeleton__container {
		position: relative;
		overflow: hidden;
		cursor: wait;
		height: var(--height);
		width: var(--width);
		background-color: $n-30;
		border-radius: v-bind(resolveShape);
	}

	.skeleton__container:after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 0;
		background: linear-gradient(90deg, transparent, $n-20, transparent);
		animation: loading-animation 1.75s linear infinite;
	}

	@keyframes loading-animation {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translateX(100%);
		}
	}
</style>
