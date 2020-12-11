<template>
	<div
		class="expansion-card"
		:class="expansionCardContainerStyle"
		@mouseover="!isExpanded ? toggleCardStyle('hover') : null"
		@mouseleave="!isExpanded ? toggleCardStyle() : null"
		@click.stop="isHovering ? toggleCardStyle('expand') : null"
	>
		<div
			v-if="isHovering"
			class="expansion-card__expand-icon"
			@click="toggleCardStyle('expand')"
		>
			<b-icon-arrows-angle-expand />
		</div>
		<div
			v-if="isExpanded"
			class="expansion-card__contract-icon"
			@click="toggleCardStyle('contract')"
		>
			<b-icon-arrows-angle-contract />
		</div>
		<!-- @slot Slot usado para inserção de conteúdo customizado
		(ignora props e slots do template padrão). -->
		<slot>
			<div
				v-if="!isExpanded"
				class="expansion-card__body"
			>
				<div
					v-if="!!icon"
					class="expansion-card__icon"
					:class="`expansion-card__icon--${variant}`"
				>
					<b-icon
						:icon="icon"
					/>
				</div>
				<div class="expansion-card__content">
					<h1 class="expansion-card__main-value">
						{{ mainValue }}
					</h1>
					<p class="expansion-card__legend">
						{{ legend }}
					</p>
				</div>
			</div>
			<div
				v-else
				class="expansion-card__expanded-body"
			>
				<div class="expansion-card__header">
					<div
						v-if="!!icon"
						class="expansion-card__icon"
						:class="`expansion-card__icon--${variant}`"
					>
						<b-icon
							:icon="icon"
						/>
					</div>
					<div class="expansion-card__content">
						<p class="expansion-card__legend">
							{{ legend }}
						</p>
						<span class="expansion-card__main-value">
							{{ subtitle }}
						</span>
					</div>
				</div>
				<div class="expansion-card__expanded-content">
					<!-- @slot Slot usado para inserção do conteúdo principal
					na versão expandida do card (template padrão). -->
					<slot name="content" />
				</div>
			</div>
		</slot>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * Variante do ExpansionCard. São 9 variantes: 'turquoise', 'green', 'blue',
		 * 'purple', 'pink', 'red', 'orange', 'yellow' e 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
		},
		/**
		 * Ícone para o template padrão. O valor desse parâmetro deve ser um alias
		 * de um ícone da biblioteca de ícones do bootstrap. Ex.: 'exclamation-circle'.
		 * Veja os ícones disponíveis em https://icons.getbootstrap.com/.
		 */
		icon: {
			type: String,
			default: null,
		},
		/**
		 * Legenda da informação principal do card (no template padrão). Torna-se
		 * o título do card quando este é expandido.
		 */
		legend: {
			type: String,
			default: null,
		},
		/**
		 * Informação principal do card (no template padrão), pode ser a quantidade 
		 * de resultados, por exemplo.
		 */
		mainValue: {
			type: Number,
			default: null,
		}
	},

	data() {
		return {
			isHovering: false,
			isExpanded: false,
		};
	},

	computed: {
		expansionCardContainerStyle() {
			let dynamicClass = this.variantStyle;

			if (this.isHovering) {
				dynamicClass += ' expansion-card--hover';	
			}
			if (this.isExpanded) {
				dynamicClass += ' expansion-card--expanded';	
			}

			return dynamicClass;
		},

		variantStyle() {
			if (!this.variant) {
				return 'expansion-card--gray';
			}
			return `expansion-card--${this.variant}`;
		},

		subtitle() {
			const s = this.mainValue !== 1 ? 's' : '';
			return `${this.mainValue} resultado${s} encontrado${s}`;
		}
	},

	methods: {
		toggleCardStyle(status) {
			this.isHovering = false;

			switch(status) {
			case 'hover':
				if (!this.isExpanded) {
					this.isHovering = true;
				}
				break;
			case 'expand':
			case 'contract':
				this.isExpanded = !this.isExpanded;
				/**
				* Evento emitido quando o card é expandido ('true') ou contraído ('false').
				* @event expanded
				* @type {Event}
				*/
				this.$emit('expanded', this.isExpanded);
				break;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

@keyframes content-animation {
	from { margin-top: 24px; opacity: 0; visibility: hidden; height: 0; } to { visibility: visible; opacity: 1; height: 100%;}
}
.expansion-card {
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
	@include padding(onidirecional, 3);
	border-radius: 16px;

	border: 1px solid $cinza-3;
	min-height: 130px;
	width: 255px;
	height: 130px;
	transition: all .2s ease-out;

	&--hover {
		transition: transform .5s, box-shadow .2s ease-out;
		transform: scale(1.035);
		cursor: pointer;

		&.expansion-card {
			transition: transform .2s, box-shadow .2s ease-in-out;

			&--blue {
				@extend .expansion-card--hover.expansion-card;
				border: 2px solid $azul-sonic-light-2;
				box-shadow: 0 0 2px $azul-sonic-base;
			}

			&--turquoise {
				@extend .expansion-card--hover.expansion-card;
				border: 2px solid $turquesa-perry-light-2;
				box-shadow: 0 0 2px $turquesa-perry-base;
			}

			&--green {
				@extend .expansion-card--hover.expansion-card;
				border: 2px solid $verde-piccolo-light-2;
				box-shadow: 0 0 2px $verde-piccolo-base;
			}

			&--purple {
				@extend .expansion-card--hover.expansion-card;
				border: 2px solid $roxo-thanos-light-2;
				box-shadow: 0 0 2px $roxo-thanos-base;
			}

			&--pink {
				@extend .expansion-card--hover.expansion-card;
				border: 2px solid $pantera-cor-de-rosa-light-2;
				box-shadow: 0 0 2px $pantera-cor-de-rosa-base;
			}

			&--red {
				@extend .expansion-card--hover.expansion-card;
				border: 2px solid $vermelho-mario-light-2;
				box-shadow: 0 0 2px $vermelho-mario-base;
			}

			&--orange {
				@extend .expansion-card--hover.expansion-card;
				border: 2px solid $laranja-naruto-light-2;
				box-shadow: 0 0 2px $laranja-naruto-base;
			}

			&--yellow {
				@extend .expansion-card--hover.expansion-card;
				border: 2px solid $amarelo-pikachu-light-2;
				box-shadow: 0 0 2px $amarelo-pikachu-base;
			}

			&--gray {
				@extend .expansion-card--hover.expansion-card;
				box-shadow: 0 0 2px $cinza-5;
				border: 2px solid $cinza-3;
			}
		}
	}

	&--expanded {
		transition: all .8s ease-out;
		width: 100%;
		height: auto;
	}

	&__body {
		display: flex;
		width: 100%;
		margin-top: auto;
		margin-bottom: auto;
	}

	&__expanded-body {
		display: flex;
		align-self: start;
		flex-direction: column;

		& .expansion-card {
			&__header {
				display: flex;
				align-items: center;
			}

			&__main-value {
				@include legenda;
				color: $cinza-6;
				margin-bottom: 2px;
				@include margin(onidirecional, 0);
			}

			&__legend {
				@include subtitulo-3;
				@include margin(onidirecional, 0);
				color: $cinza-8;
				max-width: 100%;
				font-weight: 600;
			}

			&__icon {
				@include margin(direita, 3);
			}
		}
	}

	&__expanded-content {
		opacity: 0;
		visibility: hidden;
		margin-top: 24px;
		height: 0;

		animation: content-animation 1.2s ease-out 0.8s;
		animation-fill-mode: forwards;
	}

	&__content {
		display: flex;
		flex-direction: column;
	}

	&__main-value {
		@include titulo-1;
		color: $cinza-8;
		@include margin(inferior, 0);
	}

	&__legend {
		@include legenda;
		@include margin(onidirecional, 0);
		color: $cinza-6;
		max-width: 155px;
	}

	&__icon {
		display: flex;
		padding: 12px;
		border-radius: 100%;
		width: 50px;
		height: 50px;
		align-self: center;
		align-items: center;
		justify-content: center;
		@include margin(direita, 3);

		&--blue {
			color: $azul-sonic-base;
			background-color: $azul-sonic-light-2;
		}

		&--turquoise {
			color: $turquesa-perry-base;
			background-color: $turquesa-perry-light-2;
		}

		&--green {
			color: $verde-piccolo-base;
			background-color: $verde-piccolo-light-2;
		}

		&--purple {
			color: $roxo-thanos-base;
			background-color: $roxo-thanos-light-2;
		}

		&--pink {
			color: $pantera-cor-de-rosa-base;
			background-color: $pantera-cor-de-rosa-light-2;
		}

		&--red {
			color: $vermelho-mario-base;
			background-color: $vermelho-mario-light-2;
		}

		&--orange {
			color: $laranja-naruto-base;
			background-color: $laranja-naruto-light-2;
		}

		&--yellow {
			color: $amarelo-pikachu-base;
			background-color: $amarelo-pikachu-light-2;
		}

		&--gray {
			color: $cinza-5;
			background-color: $cinza-2;
		}

		& .b-icon {
			min-width: 20px;
			min-height: 20px;
		}
	}

	&__expand-icon {
		position: absolute;
		top: 8px;
		right: 12px;
		color: $cinza-5;

		&:hover {
			transition: color ease-in-out;
			color: $azul-sonic-light-1;
		}
	}

	&__contract-icon {
		@extend .expansion-card__expand-icon;

		& .b-icon {
			cursor: pointer;
		}
	}
}
</style>
