<template>
	<div
		v-if="modelValue"
		class="side-sheet__overlay"
		tabindex="0"
		@click="shouldCloseOnBackdrop"
	>
		<div
			class="side-sheet__container"
			@click.stop
		>
			<header>
				<!-- @slot Slot usado para utilização de header customizado. -->
				<slot name="header">
					<div class="side-sheet__header">
						<h3>{{ title }}</h3>
						<div
							class="side-sheet__close-icon"
							@click="closeHandle"
						>
							<cds-clickable
								clickable
							>
								<cds-icon
									height="20"
									width="20"
									name="x-outline"
								/>
							</cds-clickable>
						</div>
					</div>
				</slot>
			</header>

			<cds-scrollable
				max-height="100%"
			>
				<!-- @slot Slot usado para mostrar o conteúdo dentro do componente. -->
				<slot />
			</cds-scrollable>

			<footer
				v-if="!noFooter"
				class="side-sheet__footer"
			>
				<!-- @slot Slot usado para inserção de footer customizado. -->
				<slot name="footer">
					<cds-button
						v-if="!noCancelButton"
						:text="cancelButtonText"
						secondary
						:disabled="disableCancelButton"
						@click="!disableCancelButton ? cancelHandle() : false"
					/>

					<cds-button
						class="footer__ok-button"
						:text="okButtonText"
						:variant="actionButtonVariant"
						:disabled="disableOkButton"
						:block="blockOkButton"
						@click="!disableOkButton ? okHandle() : false"
					/>
				</slot>
			</footer>
		</div>
	</div>
</template>

<script>
import CdsIcon from '../components/Icon.vue';
import CdsClickable from '../components/Clickable.vue';
import sassColorVariables from '../assets/sass/tokens/colors.module.scss';
import hexToRgb from '../utils/methods/hexToRgb';
import { KeyCodes } from '../utils';
import CdsButton from '../components/Button.vue';
import CdsScrollable from '../components/Scrollable.vue';

export default {
	components: {
		CdsIcon,
		CdsClickable,
		CdsButton,
		CdsScrollable,
	},
	props: {
		/**
		* Define o título do SideSheet.
		*/
		title: {
			type: String,
			default: null,
		},
		/**
		* Prop utilizada como v-model. Controla a visilidade do SideSheet.
		*/
		modelValue: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		* Indica se vai ser usado overlay junto ao SideSheet.
		*/
		withOverlay: {
			type: Boolean,
			default: false,
		},
		/**
		* Especifica o tamanho do SideSheet. São 4 tamanhos implementados: 'sm', 'md', 'lg', 'xl'.
		*/
		size: {
			type: String,
			default: 'md',
		},
		/**
		* Define se o SideSheet vai ser fechado com o click no backdrop.
		*/
		noCloseOnBackdrop: {
			type: Boolean,
			default: false,
		},
		/**
		* Define se o SideSheet vai ser fechado quando o usuário pressionar 'ESC'.
		*/
		noCloseOnEsc: {
			type: Boolean,
			default: false,
		},
		/**
		 * Define a variante do botão de ação do SideSheet (segue as variantes do componente de botão do Cuida)
		 */
		actionButtonVariant: {
			type: String,
			default: 'green',
		},
		/**
		*  Controla a exibição do rodapé (footer) do SideSheet.
		*/
		noFooter: {
			type: Boolean,
			default: false,
		},
		/**
		*  Controla a exibição do botão de cancelar do SideSheet.
		*/
		noCancelButton: {
			type: Boolean,
			default: false,
		},
		/**
		* Define o estado do botão de ação do SideSheet.
		*/
		disableOkButton: {
			type: Boolean,
			default: false,
		},
		/**
		* Define o estado do botão de cancelar do SideSheet.
		*/
		disableCancelButton: {
			type: Boolean,
			default: false,
		},
		/**
		 *  Define texto do botão de ação do SideSheet
		 */
		okButtonText: {
			type: Boolean,
			default: false,
		},
		/**
		*  Define texto do botão de cancelar do SideSheet
		*/
		cancelButtonText: {
			type: Boolean,
			default: false,
		},
		/**
		*  Altera o tipo de botão de confirmação para block
		*/
		blockOkButton: {
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
		*  Controla a ação de fechar o modal ao clicar no botão de cancelar.
		*/
		noCloseCancelButton: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			sassColorVariables,
		};
	},

	computed: {
		overlayColor() {
			const color = this.withOverlay ? this.sassColorVariables['n900'] : 'transparent';
			return `rgba(${this.hexToRgb(color)}, 0.4)`;
		},

		sideSheetWidth() {
			let width = '328px';

			switch(this.size) {
				case 'xl':
					width = '840px';
					break;
				case 'lg':
					width = '700px';
					break;
				case 'md':
					width = '500px';
					break;
				default:
					width = '340px';
					break;
			}

			return width;
		}
	},

	watch: {
		modelValue(newValue) {
			if (!newValue) {
				this.dettachKeyupEvent();
				return;
			}
			this.attachKeyupEvent();
		},
	},

	created() {
		this.attachKeyupEvent();
	},

	beforeUnmount() {
		this.dettachKeyupEvent();
	},

	methods: {
		hexToRgb,

		shouldCloseOnBackdrop() {
			if (!this.noCloseOnBackdrop) {
				/**
				* Evento utilizado para implementar o v-model.
				* @event update:modelValue
				* @type {Event}
				*/
				this.$emit('update:modelValue', !this.modelValue);
			}
		},

		shouldCloseOnEsc() {
			if (!this.noCloseOnEsc) {
				this.$emit('update:modelValue', !this.modelValue);
			}
		},

		keyupListener(ev) {
			if (ev.keyCode === KeyCodes.ESC) { // esc
				this.shouldCloseOnEsc();
			}
		},

		attachKeyupEvent() {
			window.addEventListener('keyup', this.keyupListener);
		},

		dettachKeyupEvent() {
			window.removeEventListener('keyup', this.keyupListener);
		},
		
		closeHandle() {
			/**
			 * Evento que indica se o botão de cancelar do SideSheet foi clicado.
			 * @event cancel
			 * @type {Event}
			*/
			this.$emit('close', true);
			this.$emit('update:modelValue', false);
		},

		cancelHandle() {
			/**
			 * Evento que indica se o botão de cancelar do SideSheet foi clicado.
			 * @event cancel
			 * @type {Event}
			*/
			this.$emit('cancel', true);
			if (!this.noCloseCancelButton) {
				this.$emit('update:modelValue', false);
				/**
				* Evento que indica se a SideBar foi fechada.
				* @event close
				* @type {Event}
				*/
				this.$emit('close', true);
			}
		},

		okHandle() {
			if (!this.noCloseOkButton) {
				this.$emit('update:modelValue', false);
				/**
				* Evento que indica se a SideBar foi fechada.
				* @event close
				* @type {Event}
				*/
				this.$emit('close', true);

			}
			/**
			 * Evento que indica se o botão de ação do SideSheet foi clicado.
			* @event ok
			* @type {Event}
			*/
			this.$emit('ok', true);
		},
	},
};
</script>
<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.side-sheet {
	&__overlay {
		animation: fade;
		animation-duration: 0.4s;

		background-color: v-bind(overlayColor);
		bottom: 0;
		padding: 0;
		height: 100%;
		left: 0;
		position: fixed;
		right: 0;
		top: 1;
		width: 100%;
		z-index: tokens.$z-index-sidesheet;
	}

	&__header {
		display: flex;
		justify-content: space-between;
		padding: pb(2);

		h3 {
			color: tokens.$n-900;
			@include tokens.subheading-1;
			margin: mb(2);
		}
	}

	&__container {
		animation: translate;
		animation-duration: 0.5s;

		background: tokens.$n-0;
		border-radius: 0px;
		float: right;
		height: 100%;
		width: v-bind(sideSheetWidth);
		
		padding: pa(5);
		display: grid;
		grid-template-rows: auto 1fr auto;
		border-left: 1px solid tokens.$n-30;
	}

	&__close-icon {
		color: tokens.$n-600;
		display: flex;
		justify-content: end;
		padding: pTRBL(0, 4, 4, 4);
		text-align: right;

		&:hover {
			color: tokens.$n-700;
		}
	}

	&__footer {
		display: flex;
		justify-content: end;
		padding: pt(7);
		gap: 32px;
		background-color: tokens.$n-0;
	}
}

@keyframes fade {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes translate {
  from {transform: translateX(40px);}
  to {transform: translateX(0px);}
}
</style>
