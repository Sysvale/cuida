<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span id="alert">
		<div
			class="alert"
			:class="{
				'alert__container--info': variant === 'info',
				'alert__container--success': variant === 'success',
				'alert__container--warning': variant === 'warning',
				'alert__container--danger': variant === 'danger',
			}"
		>
			<div class="alert__body">
				<div>
					<cds-icon
						:name="icon"
						:class="{
							'alert__icon--info': variant === 'info',
							'alert__icon--success': variant === 'success',
							'alert__icon--warning': variant === 'warning',
							'alert__icon--danger': variant === 'danger',
						}"
					/>
				</div>

				<span
					v-if="text.length > 0"
					class="alert__text"
				>
					{{ text }}
				</span>

				<!-- @slot Slot padrão utilizado para exibir texto do alert caso não tenha sido especificado por prop -->
				<span
					v-else
					class="alert__text"
				>
					<slot />
				</span>
			</div>

			<div
				v-if="dismissible"
				class="alert__close-button"
				@click="close"
			>
				<cds-icon
					name="x-outline"
					:class="{
						'alert__icon--info': variant === 'info',
						'alert__icon--success': variant === 'success',
						'alert__icon--warning': variant === 'warning',
						'alert__icon--danger': variant === 'danger',
					}"
				/>
			</div>
		</div>
	</span>
</template>

<script>
import CdsIcon from '../components/Icon.vue';

export default {
	components: {
		CdsIcon,
	},

	props: {
		/**
		 * A variante do Alert. São 3 variantes implementadas: 'info', 'warning'
		 * e 'danger'
		 */
		variant: {
			type: String,
			default: 'info',
			required: false,
		},
		/**
		 * O título do alert. O título também pode ser usado com o slot.
		 */
		text: {
			type: String,
			default: 'Título do AlertCard',
			required: false,
		},
		/**
		 * Prop que exibe botão de fechamento do alert.
		 */
		dismissible: {
			type: Boolean,
			default: false,
			required: false,
		},
	},

	data() {
		return {
			icon: 'warning-outline',
		};
	},

	watch: {
		variant: {
			handler(value) {
				switch (value) {
					case 'info':
						this.icon = 'info-outline';
						break;
					case 'success':
						this.icon = 'check-circle-outline';
						break;
					case 'warning':
						this.icon = 'warning-outline';
						break;
					case 'danger':
						this.icon = 'alert-outline';
						break;
					default:
						this.icon = 'alert-outline';
						break;
				}
			},
			immediate: true,
		},
	},

	methods: {
		close() {
			/**
			 * Evento emitido quando o botão de fechar o alert é clicado.
			 * @event close
			 * @type {Event}
			 */
			this.$emit('close');
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

#alert .alert {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: pa(4);
	border-radius: $border-radius-extra-small;

	&__body {
		display: flex;
		align-items: center
	}

	&__container {
		@extend .alert;

		&--info {
			@extend .alert__container;
			outline: 2px solid $bn-100;
			background-color: $bn-50;
			color: $bn-600;
		}

		&--success {
			@extend .alert__container;
			outline: 2px solid $gp-100;
			background-color: $gp-50;
			color: $gp-600;
		}

		&--warning {
			@extend .alert__container;
			outline: 2px solid $al-100;
			background-color: $al-50;
			color: $al-700;
		}

		&--danger {
			@extend .alert__container;
			outline: 2px solid $rc-100;
			background-color: $rc-50;
			color: $rc-600;
		}
	}

	&__icon {
		//Valor fixo utilizado apenas para ajuste do posicionamento do ícone
		margin-top: 2px;

		&--info {
			@extend .alert__icon;
			color: $bn-600;
		}
		&--success {
			@extend .alert__icon;
			color: $gp-600;
		}

		&--warning {
			@extend .alert__icon;
			color: $al-700;
		}

		&--danger {
			@extend .alert__icon;
			color: $rc-600;
		}
	}

	&__text {
		margin: ml(2);
		@include body-2;
		font-weight: $font-weight-semibold;
	}

	&__close-button {
		display: flex;
		cursor: pointer;
	}
}
</style>
