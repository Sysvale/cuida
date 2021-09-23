<template>
	<div
		class="expansion-card"
		:class="expansionCardContainerStyle"
		@mouseover="!isExpanded ? toggleCardStyle('hover') : null"
		@mouseleave="!isExpanded ? toggleCardStyle() : null"
		@click="isHovering ? toggleCardStyle('expand') : null"
	>
		<div
			v-if="isHovering"
			class="expansion-card__expand-icon"
			@click.stop="toggleCardStyle('expand')"
		>
			<span class="expansion-card__label-button">Maximizar</span>
		</div>
		<div
			v-if="isExpanded"
			class="expansion-card__contract-icon"
			@click.stop="toggleCardStyle('contract')"
		>
			<span class="expansion-card__label-button">Minimizar</span>
		</div>
		<!-- @slot Slot usado para inserção de conteúdo customizado
		(ignora props e slots do template padrão). -->
		<slot>
			<div
				v-if="!isExpanded"
				class="expansion-card__body"
			>
				<div
					class="expansion-card__icon"
					:class="`expansion-card__icon--${variant}`"
				>
					<!-- @slot Slot para ícone para o template padrão. -->
					<slot name="icon" />
				</div>
				<div class="expansion-card__content">
					<!-- @slot Slot para informação principal do card no template padrão. -->
					<slot name="main-value">
						<h1 class="expansion-card__main-value">
							{{ mainValue }}
						</h1>
					</slot>
					<p class="expansion-card__legend">
						<!-- @slot Slot para legenda da informação principal do card recolhido,
						no template padrão. Torna-se o título do card quando este é estendido.-->
						<slot name="legend">
							{{ legend }}
						</slot>
					</p>
				</div>
			</div>
			<div
				v-else
				class="expansion-card__expanded-body"
			>
				<div class="expansion-card__header">
					<div
						class="expansion-card__icon"
						:class="`expansion-card__icon--${variant}`"
					>
						<slot name="icon" />
					</div>
					<div class="expansion-card__content">
						<p class="expansion-card__legend">
							<slot name="legend">
								{{ legend }}
							</slot>
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
		 * 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
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
		},
		/**
		 * Indica se o card é expansível.
		 */
		expansible: {
			type: Boolean,
			default: true,
		},
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
				dynamicClass += ` expansion-card--hover-${this.variant}`;
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
		},
	},

	methods: {
		toggleCardStyle(status) {
			this.isHovering = false;

			if (this.expansible) {
				switch (status) {
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
					default:
						break;
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

ion-icon {
	font-size: 20px !important;
}

@keyframes content-animation {
	from {
		margin: mt(6);
		opacity: 0;
		visibility: hidden;
		height: 50%;
	} to {
		visibility: visible;
		opacity: 1;
		height: 100%;
	}
}

::v-deep .expansion-card__expand-icon path {
	stroke: $n-300;
	stroke-width: 1;
}

::v-deep .expansion-card__expand-icon:hover path {
	transition: stroke ease-in-out;
	stroke: $bn-300;
}

.expansion-card {
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
	padding: pa(4);
	border-radius: 16px;

	border: 1px solid $n-30;
	min-height: 130px;
	width: 255px;
	height: 130px;
	transition: all .3s ease-in-out;

	&__label-button {
		@include caption;
		cursor: pointer;

		&:hover {
			text-decoration: underline;
		}
	}

	&--hover {
		transition: transform .5s, box-shadow .2s ease-out;
		transform: scale(1.035);
		cursor: pointer;

		&-blue {
			@extend .expansion-card--hover, .expansion-card;
			transition: transform .2s, box-shadow .2s ease-in-out;
			border: 2px solid $bn-200;
			box-shadow: 0 0 2px $bn-200;
		}

		&-turquoise {
			@extend .expansion-card--hover, .expansion-card;
			transition: transform .2s, box-shadow .2s ease-in-out;
			border: 2px solid $ts-200;
			box-shadow: 0 0 2px $ts-200;
		}

		&-green {
			@extend .expansion-card--hover, .expansion-card;
			transition: transform .2s, box-shadow .2s ease-in-out;
			border: 2px solid $gp-200;
			box-shadow: 0 0 2px $gp-200;
		}

		&-indigo {
			@extend .expansion-card--hover, .expansion-card;
			transition: transform .2s, box-shadow .2s ease-in-out;
			border: 2px solid $in-200;
			box-shadow: 0 0 2px $in-200;
		}

		&-violet {
			@extend .expansion-card--hover, .expansion-card;
			transition: transform .2s, box-shadow .2s ease-in-out;
			border: 2px solid $vr-200;
			box-shadow: 0 0 2px $vr-200;
		}

		&-pink {
			@extend .expansion-card--hover, .expansion-card;
			transition: transform .2s, box-shadow .2s ease-in-out;
			border: 2px solid $pp-200;
			box-shadow: 0 0 2px $pp-200;
		}

		&-red {
			@extend .expansion-card--hover, .expansion-card;
			transition: transform .2s, box-shadow .2s ease-in-out;
			border: 2px solid $rc-200;
			box-shadow: 0 0 2px $rc-200;
		}

		&-orange {
			@extend .expansion-card--hover, .expansion-card;
			transition: transform .2s, box-shadow .2s ease-in-out;
			border: 2px solid $og-200;
			box-shadow: 0 0 2px $og-200;
		}

		&-amber {
			@extend .expansion-card--hover, .expansion-card;
			transition: transform .2s, box-shadow .2s ease-in-out;
			border: 2px solid $al-200;
			box-shadow: 0 0 2px $al-200;
		}

		&-gray {
			@extend .expansion-card--hover, .expansion-card;
			transition: transform .2s, box-shadow .2s ease-in-out;
			box-shadow: 0 0 2px $n-50;
			border: 2px solid $n-30;
		}
	}

	&--expanded {
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
		width: 100%;

		& .expansion-card {
			&__header {
				display: flex;
				align-items: center;
			}

			&__main-value {
				@include caption;
				color: $n-600;
				margin: mb(1);
				margin: ma(0);
			}

			&__legend {
				@include subheading-3;
				margin: ma(0);
				color: $n-800;
				max-width: 100%;
				font-weight: 600;
			}

			&__icon {
				margin: mr(4);
			}
		}
	}

	&__expanded-content {
		opacity: 0;
		visibility: hidden;
		margin: mt(6);
		height: 0;

		animation: content-animation;
		animation-delay: 0.45s;
		animation-duration: 0.4s;
		animation-fill-mode: forwards;
	}

	&__content {
		display: flex;
		flex-direction: column;
	}

	&__main-value {
		@include heading-1;
		color: $n-800;
		margin: mb(0);
	}

	&__legend {
		@include caption;
		margin: ma(0);
		color: $n-600;
		max-width: 155px;
	}

	&__icon {
		display: flex;
		padding: pa(3);
		border-radius: 100%;
		width: 50px;
		height: 50px;
		align-self: center;
		align-items: center;
		justify-content: center;
		margin: mr(4);

		&--blue {
			color: $bn-400;
			background-color: $bn-100;
		}

		&--turquoise {
			color: $ts-500;
			background-color: $ts-100;
		}

		&--green {
			color: $gp-400;
			background-color: $gp-100;
		}

		&--indigo {
			color: $in-400;
			background-color: $in-100;
		}

		&--violet {
			color: $vr-500;
			background-color: $vr-100;
		}

		&--pink {
			color: $pp-500;
			background-color: $pp-100;
		}

		&--red {
			color: $rc-500;
			background-color: $rc-100;
		}

		&--orange {
			color: $og-500;
			background-color: $og-100;
		}

		&--amber {
			color: $al-500;
			background-color: $al-100;
		}

		&--gray {
			color: $n-300;
			background-color: $n-20;
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
		color: $n-500;

		&:hover {
			transition: color ease-in-out;
			color: $bn-300;
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
