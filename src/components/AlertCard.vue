<template>
	<div
		class="alert-card__container"
	>
		<div
			v-if="selectable"
			class="rcheckbox"
		>
			<input
				type="checkbox"
				:id="`input`"
				:name="`input`"
				:value="true"
			/>
			<label
				:id="`checkbox`"
				:for="`input`"
				@click="selectCheckbox"
				:class="{ 'rcheckbox--checked': isSelected }"
			/>
		</div>

		<div
			v-if="withIcon"
			:class="`icon__container--${variant}`"
		>
			<component
				:is="dynamicIcon"
				size="1.4x"
				:class="`icon--${variant}`"
			/>
		</div>

		<div>
			<span :class="`alert-card__title--${variant}`">{{ title }}</span>
			<span
				v-if="!$slots['subTitle']"
				class="alert-card__subtitle"
			>
				{{ subTitle }}
			</span>

			<!-- @slot Slot usado para inserção de conteúdo customizado no subtítulo. -->
			<slot name="subTitle" class="alert-card__subtitle" />

			<!-- @slot Slot usado para inserção de conteúdo adicional no AlertCard
				abaixo do subtítulo. -->
			<slot name="content" class="alert-card__content" />
		</div>
	</div>
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
			required: true,
		},
	},

	components: {
		InfoIcon,
		AlertTriangleIcon,
		AlertCircleIcon
	},

	data() {
		return {
			isSelected: false,
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

.alert-card {
	&__container {
		display: flex;
		align-items: center;
		@include padding(onidirecional, 3);
		border: 1px solid $cinza-3;
		border-radius: 16px;
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
		@include margin(superior, 2);
		display: block;
		color: $cinza-6;
	}

	&__content {
		@include margin(superior, 3);
	}
}

.icon {
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

.rcheckbox {
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
}

.rcheckbox--checked {
	background-color: $azul-bidu-dark-1 !important;
	border: none !important;
}
</style>
