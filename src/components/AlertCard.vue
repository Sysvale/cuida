<template>
	<span id="alert-card">
		<div
			class="alert-card__container"
			:class="alertCardContainerSelected"
			v-on="selectable && !muted ? { click: selectCheckbox } : {}"
		>
			<div
				v-if="selectable"
				class="custom-checkbox"
			>
				<input
					type="checkbox"
					id="checkbox-input"
					name="checkbox-input"
					:value="isSelected"
					:checked="isSelected"
				/>
				<label
					id="custom-checkbox"
					@click.stop="selectCheckbox"
					:class="{ 'custom-checkbox--checked': isSelected }"
				/>
			</div>

			<div
				v-if="withIcon"
				:class="iconClass"
			>
				<component
					:is="dynamicIcon"
					size="1.4x"
					:class="`icon--${variant}`"
				/>
			</div>

			<div
				class="alert-card__content-container"
			>
				<span
					v-if="!noTitle"
					:class="`alert-card__title--${variant}`"
				>
					{{ title }}
				</span>

				<!-- @slot Slot usado para inserção de conteúdo customizado no subtítulo. -->
				<span
					class="alert-card__subtitle"
					:class="`${noTitle ? 'mt-0' : 'mt-2'}`"
				>
					<slot name="subTitle-slot">
						{{ subTitle }}
					</slot>
				</span>

				<!-- @slot Slot usado para inserção de conteúdo adicional no AlertCard
					abaixo do subtítulo. -->
				<slot name="content-slot" class="alert-card__content" />
			</div>
		</div>

	</span>
</template>

<script>
import { InfoIcon, AlertTriangleIcon, AlertCircleIcon } from 'vue-feather-icons';

export default {
	props: {
		/**
		 * A variante do Alert. São 3 variantes implementadas: 'info', 'warning'
		 * e 'danger'
		 */
		variant: {
			type: String,
			default: 'info',
		},
		/**
		 * O título do alerta. O título também pode ser usado com o slot.
		 */
		title: {
			type: String,
			default: 'Título do AlertCard',
		},
		/**
		 * O subtítulo do alerta. O subtítulo também pode ser usado com o slot.
		 */
		subTitle: {
			type: String,
			default: 'Subtítulo do AlertCard',
		},
		/**
		 * Indica se a prop title deve ser exibida.
		 */
		noTitle: {
			type: Boolean,
			default: false,
		},
		/**
		 * Determina se o Alert vai ter ícone ou não.
		 */
		withIcon: {
			type: Boolean,
			default: true,
		},
		/**
		 * Determina se o Alert vai ter um checkbox de seleção.
		 */
		selectable: {
			type: Boolean,
			default: false,
		},
		/**
		* Prop utilizada como v-model. Controla a visibilidade do popover .
		*/
		value: {
			type: Boolean,
			default: false,
		},
		/**
		* Deixa o card com o estilo de card desabilitado.
		*/
		muted: {
			type: Boolean,
			default: false,
		},
	},

	components: {
		InfoIcon,
		AlertTriangleIcon,
		AlertCircleIcon
	},

	data() {
		return {
			isSelected: this.value,
		};
	},

	computed: {
		dynamicIcon() {
			switch (this.variant) {
				case 'info':
					return 'info-icon'
				case 'warning':
					return 'alert-triangle-icon';
				case 'danger':
					return 'alert-circle-icon';
				default:
					return 'info-icon';
			}
		},

		alertCardContainerSelected() {
			let dynamicClass = '';

			if (!this.muted) {
				if (this.selectable) {
					dynamicClass = 'alert-card__container--selectable';	
				}
				
				if (this.isSelected) {
					return dynamicClass + ` alert-card__container--selected-${this.variant}`
				}
			} else {
				dynamicClass = 'alert-card__container--muted';
			}

			return dynamicClass;
		},

		iconClass() {
			return `icon__container--${this.variant} ${this.noTitle ? 'align-self-center' : ''}`
		}
	},

	methods: {
		selectCheckbox() {
			this.isSelected = !this.isSelected;
			/**
			 * Evento utilizado para implementar o v-model.
			* @event input
			* @type {Event}
				*/
			this.$emit('input', !this.value);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

#alert-card .alert-card {
	display: flex;
	align-items: center;
	@include padding(onidirecional, 3);
	border-radius: 16px;

	&__container {
		@extend .alert-card;	
		border: 1px solid $cinza-3;

		&--selectable {
			cursor: pointer;
		}

		&--muted {
			background-color: $cinza-1;
		}
	}

	&__container--selected-info {
		@extend .alert-card;
		border: 2px solid $azul-sonic-light-1;
		box-shadow: 1px 1px 4px rgba(32, 110, 217, 0.5);
	}

	&__container--selected-warning {
		@extend .alert-card;
		border: 2px solid $amarelo-pikachu-light-1;
		box-shadow: 1px 1px 4px rgba(253, 210, 145, 0.5);
	}

	&__container--selected-danger {
		@extend .alert-card;
		border: 2px solid $vermelho-mario-light-1;
		box-shadow: 1px 1px 4px rgba(237, 59, 81, 0.5);
	}

	&__title {
		@include subtitulo-2;
		margin-top: 12px;
		display: block;

		&--info {
			@extend .alert-card__title;
			color: $azul-sonic-dark-1;
		}

		&--warning {
			@extend .alert-card__title;
			color: $amarelo-pikachu-dark-2;
		}

		&--danger {
			@extend .alert-card__title;
			color: $vermelho-mario-dark-1;
		}
	}

	&__subtitle {
		@include subtitulo-3;
		display: block;
		color: $cinza-6;
	}

	&__content {
		@include margin(superior, 3);
	}

	&__content-container {
		width: 100%;
	}
}

#alert-card .icon {
	stroke-width: 2.4;

	&--info {
		@extend .icon;
		color: $azul-sonic-dark-1;
	}

	&--warning {
		@extend .icon;
		color: $amarelo-pikachu-dark-2;
	}

	&--danger {
		@extend .icon;
		color: $vermelho-mario-dark-1;
	}

	&__container {
		display: flex;
		padding: 12px;
		border-radius: 100%;
		margin-right: 12px;
		align-self: flex-start;

		&--info {
			@extend .icon__container;
			background-color: $azul-sonic-light-2;
		}

		&--warning {
			@extend .icon__container;
			background-color: $amarelo-pikachu-light-2;
		}

		&--danger {
			@extend .icon__container;
			background-color: $vermelho-mario-light-2;
		}
	}
}

#alert-card .custom-checkbox {
	@include margin(superior, 3);
	align-self: flex-start;
	margin-right: 32px;
	width: 14px;
	position: relative;
	margin-left: -8px;

	label {
		cursor: pointer;
		position: absolute;
		width: 14px;
		height: 14px;
		top: 0;
		border-radius: 4px;
		border: 1px solid $cinza-5;

		&:after {
			border: 2px solid $branco;
			border-top: none;
			border-right: none;
			content: "";
			height: 5px;
			left: 3.1px;
			opacity: 0;
			position: absolute;
			top: 4.4px;
			transform: rotate(-45deg);
			width: 8px;
			border-radius: 0.4px;
		}
	}

	input[type=checkbox]:checked + label:after {
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
		filter: alpha(opacity=100);
		opacity: 1;
	}

	input[type=checkbox] {
		visibility: hidden;
	}
}

#alert-card .custom-checkbox--checked {
	background-color: $azul-bidu-dark-1 !important;
	border: none !important;
}

</style>
