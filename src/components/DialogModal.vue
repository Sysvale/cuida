<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		v-if="innerValue"
		class="cds-modal__backdrop"
	>
		<div
			v-if="innerValue"
			class="cds-modal"
		>
			<header class="cds-modal__header">
				<div class="cds-modal__header-content">
					<cds-icon
						class="cds-modal__header-icon"
						height="40"
						width="40"
						name="warning-outline"
					/>
					Atenção
				</div>
				<cds-icon
					class="cds-modal__header-detail"
					height="60"
					width="60"
					name="warning-outline"
				/>
			</header>

			<div
				class="cds-modal__body"
			>
				<span class="cds-modal__body-title">
					Tem certeza que deseja continuar?
				</span>
				<span class="cds-modal__body-description">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					Nostrum quo blanditiis debitis ratione placeat et adipisci,
					quia eveniet, deleniti omnis reprehenderit commodi quaerat
					quisquam minus ullam maxime libero veritatis aut.
				</span>
			</div>

			<footer
				v-if="!noFooter"
				class="cds-modal__footer"
			>
				<!-- @slot Slot usado para inserção de footer customizado. -->
				<slot name="footer">
					<cds-button
						v-if="!noCancelButton"
						:text="cancelButtonText"
						secondary
						:disabled="disableCancelButton"
						@click="!disableCancelButton ? closeHandle() : false"
					/>

					<cds-button
						class="footer__ok-button"
						:text="okButtonText"
						:variant="actionButtonVariant"
						:disabled="disableOkButton"
						@click="!disableOkButton ? okHandle() : false"
					/>
				</slot>
			</footer>
		</div>
	</div>
</template>

<script>
import CdsIcon from '../components/Icon.vue';
import CdsButton from '../components/Button.vue';
import vClickOutside from 'click-outside-vue3';

const predefinedColors = [
	'teal',
	'green',
	'blue',
	'indigo',
	'violet',
	'pink',
	'red',
	'orange',
	'amber',
];

export default {
	directives: {
		'on-click-outside': vClickOutside.directive,
	},

	components: {
		CdsIcon,
		CdsButton,
	},
	props: {
		/**
		 *  Controla a exibição do modal.
		 */
		modelValue: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		 * Define o título do modal exibido no header
		 */
		title: {
			type: String,
			default: 'Título',
		},
		/**
		 * Especifica o tamanho do modal. São 3 tamanhos implementados: 'sm', 'md', 'lg' e 'xl'.
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * Define o estado do botão de ação do modal.
		 */
		disableOkButton: {
			type: Boolean,
			default: false,
		},
		/**
		 * Define o estado do botão de cancelar do modal.
		 */
		disableCancelButton: {
			type: Boolean,
			default: false,
		},
		/**
		 *  Controla a ação de fechar o modal ao clicar fora.
		 */
		noCloseOnBackdrop: {
			type: Boolean,
			default: false,
		},
		/**
		 *  Controla a ação de fechar o modal ao clicar no botão de ação.
		 */
		noCloseOkButton: {
			type: Boolean,
			default: false,
		},
		/**
		 *  Controla a exibição do botão de fechar do modal.
		 */
		noCloseButton: {
			type: Boolean,
			default: false,
		},
		/**
		 *  Controla a exibição do botão de cancelar do modal.
		 */
		noCancelButton: {
			type: Boolean,
			default: false,
		},
		/**
		 *  Controla a exibição do rodapé (footer) do modal.
		 */
		noFooter: {
			type: Boolean,
			default: false,
		},
		/**
		 *  Controla a exibição do cabeçalho (header) do modal.
		 */
		noHeader: {
			type: Boolean,
			default: false,
		},
		/**
		 *  Define texto do botão de ação do modal
		 */
		okButtonText: {
			type: String,
			default: 'Confirmar',
		},
		/**
		 *  Define texto do botão de cancelar do modal
		 */
		cancelButtonText: {
			type: String,
			default: 'Cancelar',
		},
		/**
		 * Define a variante do botão de ação do Modal (segue as variantes do componente de botão do Cuida)
		 */
		actionButtonVariant: {
			type: String,
			default: 'green',
			validator: (value) => predefinedColors.includes(value),
		},
		/**
		 * Define se o conteúdo do modal precisa ser "scrollado" e adiciona um scroll vertical quando a altura máxima é atingida
		 */
		scrollable: {
			type: Boolean,
			default: false,
		}
	},

	data() {
		return {
			innerValue: false,
			tmp: '',
		}
	},

	computed: {
		maxBodyHeight() {
			// 90% da largura subtraído o padding vertical (32 * 2) e subtraído o footer (68) e o header (64)
			return `${ window.innerHeight * 0.9 - 32 * 2 - 68 - 64 }px`;
		},
	},

	watch: {
		modelValue(value) {
			this.innerValue = value;
		},
	},

	mounted() {
		this.innerValue = this.modelValue;
	},

	methods: {

		closeHandle() {
			/**
			 * Evento que indica se o modal foi escondido.
			 * @event close
			 * @type {Event}
			*/
			this.innerValue = !this.innerValue;
			this.$emit('close', true);
			this.$emit('update:modelValue', false);
		},

		okHandle() {
			/**
			 * Evento que indica se o botão de ação do modal foi clicado.
			* @event ok
			* @type {Event}
			*/
			if (!this.noCloseOkButton) {
				this.innerValue = !this.innerValue;
				this.$emit('update:modelValue', false);
			}
			this.$emit('ok', true);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.cds-modal {
	display: flex;
	flex-direction: column;
	max-height: 90%;
	position: absolute;
	width: 500px;
	height: auto;
	border-radius: $border-radius-medium;
	overflow: hidden;
	background-color: white;
	border-radius: $border-radius-medium;
	box-shadow: 0px 0px 8px rgba(40, 90, 185, 0.2);
	overflow-x: visible;
	z-index: 1060;
	animation: zoom-in .5s;

	&__backdrop {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		padding: px(4);
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.45);
		z-index: 1060;
		animation: zoom-in ease .3s;
	}

	&__header {
		overflow: hidden;
		display: flex;
		max-height: 80px;
		align-items: center;
		background: linear-gradient(90deg, #FFF1D9 0%, #FFE5B8 100%);
		@include subheading-1;
		color: $n-800;
		font-weight: $font-weight-semibold;
		justify-content: space-between;
	}

	&__header-content {
		display: flex;
		align-items: center;
		gap: spacer(2);
		padding: pYX(6,5)
	}

	&__header-icon {
		color: $al-500;
	}

	&__header-detail {
		zoom: 2.4;
		margin: spacer(n6);
		color: rgba(242, 154, 0, 0.16)
	}

	&__body {
		margin: ma(4);
		display: flex;
		flex-direction: column;
		gap: spacer(3);

		&-title {
			@include subheading-1;
			font-weight: $font-weight-bold;
		}

		&-description {
			@include body-1;
			font-weight: $font-weight-regular;
		}
	}

	&__footer {
		display: flex;
		gap: spacer(4);
		justify-content: center;
		padding: pYX(6, 0);

	}
}

@keyframes zoom-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@media (min-width: 576px) {
	.cds-modal--md {
		max-width: 500px;
		width: 500px;
		right: calc(50% - 500px / 2);
	}
	.cds-modal--sm {
		max-width: 300px;
		width: 300px;
		right: calc(50% - 300px / 2);
	}
}

@media (min-width: 992px) {
	.cds-modal--lg {
		max-width: 800px;
		width: 800px;
		right: calc(50% - 800px / 2);
	}
}

@media (min-width: 1500px) {
	.cds-modal--xl {
		max-width: 1200px;
		width: 1200px;
		right: calc(50% - 1200px / 2);
	}
}
</style>