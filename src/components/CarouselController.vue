<template>
	<div>
		<div
			class="carousel-controller"
			:class="{ 'carousel-controller--fluid': fluid }"
		>
			<span
				:class="{
					'carousel-controller__previous-button--disabled': disabledBack,
					'carousel-controller__previous-button': !disabledBack
				}"
				@click="handleClickBack"
			/>

			<div>
				<span
					v-if="!simple"
					class="carousel-controller__text"
				>
					{{ currentNumberOfItemsMin }}-{{ currentNumberOfItemsMax }} de {{ total }}
				</span>
				<span
					v-else
					class="carousel-controller__text"
				>
					{{ currentNumberOfItemsMin }} de {{ numberOfPages }}
				</span>
	
				<span class="carousel-controller__property"> {{ propertyName }} </span>
			</div>

			<span
				:class="{
					'carousel-controller__next-button--disabled': disabledForward,
					'carousel-controller__next-button': !disabledForward
				}"
				@click="handleClickForward"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CarouselController',
	props: {
		/**
		 * Nome da propriedade exibida no controle do carousel.
		 */
		propertyName: {
			type: String,
			required: true,
		},
		/**
		 * Número de itens por página do carousel.
		 */
		perPage: {
			type: Number,
			required: true,
		},
		/**
		 * Número total de itens no carousel.
		 */
		total: {
			type: Number,
			required: true,
		},
		/**
		 * Quando true, exibe o controle em modo simples (página atual de total de páginas).
		 */
		simple: {
			type: Boolean,
			default: false,
		},
		/**
		 * Quando true, o controle ocupa toda a largura disponível com espaçamento distribuído.
		 */
		fluid: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			currentNumberOfItemsMin: 1,
			currentNumberOfItemsMax: this.perPage,
		};
	},

	computed: {
		numberOfPages() {
			return Math.ceil(this.total / this.perPage);
		},

		disabledForward() {
			return (this.currentNumberOfItemsMax >= this.total) 
			|| (this.simple && (this.currentNumberOfItemsMin >= this.numberOfPages));
		},

		disabledBack() {
			return this.currentNumberOfItemsMin === 1;
		}
	},

	methods: {
		handleClickBack() {
			if (this.disabledBack) return;

			if (this.simple && (this.currentNumberOfItemsMin > 1)) {
				this.currentNumberOfItemsMin -= 1;
				/**
				* Evento que indica que o botão voltar foi clicado
				* @event click-back
				* @type {Object}
				* @property {number} min - Índice mínimo da página atual (base 0)
				* @property {number} max - Índice máximo da página atual (base 0)
				*/
				this.$emit('click-back', { min: this.currentNumberOfItemsMin - 1, max: this.currentNumberOfItemsMax + 1 });
				return;
			} else if (this.simple && (this.currentNumberOfItemsMin === 1)) {
				return;
			}

			if (this.currentNumberOfItemsMin - this.perPage <= 0) {
				this.currentNumberOfItemsMin = 1;
				this.currentNumberOfItemsMax = this.perPage;
				this.$emit('click-back', { min: this.currentNumberOfItemsMin - 1, max: this.currentNumberOfItemsMax + 1 });
			} else {
				this.currentNumberOfItemsMax -= this.currentNumberOfItemsMax - this.currentNumberOfItemsMin + 1;
				this.currentNumberOfItemsMin -= this.perPage;
				this.$emit('click-back', { min: this.currentNumberOfItemsMin - 1, max: this.currentNumberOfItemsMax});
			}
		},

		handleClickForward() {
			if (this.disabledForward) return;

			if (this.simple && (this.currentNumberOfItemsMin < this.numberOfPages)) {
				this.currentNumberOfItemsMin += 1;
				/**
				* Evento que indica que o botão avançar foi clicado
				* @event click-forward
				* @type {Object}
				* @property {number} min - Índice mínimo da página atual (base 0)
				* @property {number} max - Índice máximo da página atual (base 0)
				*/
				this.$emit('click-forward', { min: this.currentNumberOfItemsMin - 1, max: this.currentNumberOfItemsMax + 1 });
				return;
			} else if (this.simple && (this.currentNumberOfItemsMin === this.numberOfPages)) {
				return;
			}

			if ((this.currentNumberOfItemsMax + this.perPage) > this.total) {
				this.currentNumberOfItemsMin = this.currentNumberOfItemsMax + 1;
				this.currentNumberOfItemsMax = this.total;
				this.$emit('click-forward', { min: this.currentNumberOfItemsMin - 1, max: this.currentNumberOfItemsMax + 1 });
			} else {
				this.currentNumberOfItemsMin = this.currentNumberOfItemsMax + 1;
				this.currentNumberOfItemsMax += this.perPage;
				this.$emit('click-forward', { min: this.currentNumberOfItemsMin - 1, max: this.currentNumberOfItemsMax + 1 });
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.carousel-controller {
	position: relative;
	width: fit-content;
	display: flex;
	align-items: center;

	&--fluid {
		width: 100%;
		justify-content: space-between;
	}

	&__text {
		margin: tokens.ml(7);
		font-size: 14px;
		color: tokens.$n-500;
		font-weight: tokens.$font-weight-semibold;
	}

	&__property {
		margin: tokens.mTRBL(0, 7, 0, 2);
		font-size: 14px;
		color: tokens.$n-800;
		font-weight: tokens.$font-weight-semibold;
	}

	&__previous-button {
		display: block;
		height: 32px;
		width: 32px;
		cursor: pointer;
		border-radius: tokens.$border-radius-small;
		display: flex;
		align-items: center;
		justify-content: center;
	
		&::before,
		&::after {
			content: '';
			width: 0;
			height: 0;
		}
	
		&::before {
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 6px solid tokens.$n-400;
			border-radius: tokens.$border-radius-small;
			transition: all 100ms ease-in-out;
			transform: rotate(-90deg);
		}

		&--disabled {
			@extend .carousel-controller__previous-button;

			&::before,
			&::after {
				content: '';
				width: 0;
				height: 0;
			}
	
			&::before {
				border-left: 6px solid transparent;
				border-right: 6px solid transparent;
				border-bottom: 6px solid tokens.$n-100;
				border-radius: tokens.$border-radius-small;
				transition: all 100ms ease-in-out;
				transform: rotate(-90deg);
			}
		}
	}
	
	&__next-button {
		display: block;
		height: 32px;
		width: 32px;
		cursor: pointer;
		border-radius: tokens.$border-radius-small;
		display: flex;
		align-items: center;
		justify-content: center;
	
		&::before,
		&::after {
			content: '';
			width: 0;
			height: 0;
		}
	
		&::before {
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 6px solid tokens.$n-400;
			border-radius: tokens.$border-radius-small;
			transition: all 100ms ease-in-out;
			transform: rotate(90deg);
		}

		&--disabled {
			@extend .carousel-controller__next-button;

			&::before,
			&::after {
				content: '';
				width: 0;
				height: 0;
			}
		
			&::before {
				border-left: 6px solid transparent;
				border-right: 6px solid transparent;
				border-bottom: 6px solid tokens.$n-100;
				border-radius: tokens.$border-radius-small;
				transition: all 100ms ease-in-out;
				transform: rotate(90deg);
			}
		}
	}
}
</style>
