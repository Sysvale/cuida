<template>
	<div
		v-if="internalShow"
		class="cds-modal__backdrop"
	>
		<div
			v-if="internalShow"
			class="cds-modal"
			:style="dynamicStyle"
			v-on-click-outside="noCloseOnBackdrop ? () => {} : close"
		>
			<header 
				v-if="!noHeader"
			>
				<!-- @slot Slot usado para utilização de header customizado. -->
				<slot name="header">
					<div class="cds-modal__header">
						<h3>Título</h3>
						<ion-icon
							v-if="!noCloseButton"
							name="close-outline"
							class="cds-modal__close-icon"
							@click="close"
						/>
					</div>
				</slot>
			</header>

			<!-- @slot Slot usado para inserção de conteúdo dentro do Modal. -->
			<section>
				<cds-scrollable
					:max-height="maxBodyHeight"
					auto-height
				>
					<slot />
				</cds-scrollable>
			</section>

			<footer
				v-if="!noFooter"
				class="cds-modal__footer"
			>
				<!-- @slot Slot usado para inserção de footer customizado. -->
				<slot name="footer">
					<cds-button
						v-if="!noCancelButton"
						text="Cancelar"
						secondary
						:disabled="disabled"
						@click="close"
					/>
					<cds-button
						class="ml-2"
						text="Ok"
						variant="green"
						:disabled="disabled"
						@click="ok"
					/>
				</slot>
			</footer>
		</div>
	</div>
</template>

<script>
import { directive as onClickOutside } from 'vue-on-click-outside';

export default {
	directives: {
		'on-click-outside': onClickOutside,
	},

	data() {
		return {
			internalShow: false,
		}
	},
	props: {
		/**
		 *  Controla a exibição do modal.
		 */
		show: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		 * Define a largura do modal.
		 */
		width: {
			type: Number,
			default: 150,
		},
		/**
		 * Define o estado das ações do modal.
		 */
		disabled: {
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
	},

	mounted() {
		this.internalShow = this.show;
	},

	watch: {
		show(value) {
			this.internalShow = value;
		},
	},

	computed: {
		dynamicStyle() {
			return {
				'--width': `${this.width}px`,
			};
		},

		maxBodyHeight() {
			// 90% da largura subtraído o padding vertical (32 * 2) e subtraído o footer e o header
			return `${ window.innerHeight * 0.9 - 32 * 2 - 110 }px`;
		},
	},

	methods: {
		close() {
			/**
			 * Evento que indica se o modal foi escondido.
			* @event close
			* @type {Event}
			*/
			this.$emit('close', true);
			this.internalShow = !this.internalShow;
		},
		ok() {
			/**
			 * Evento que indica se o botão de ação do modal foi clicado.
			* @event ok
			* @type {Event}
			*/
			this.$emit('ok', true);
			this.internalShow = !this.internalShow;
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.cds-modal {
	display: flex;
	flex-direction: column;
	max-height: 90%;
	height: auto;
	width: var(--width);
	position: absolute;
	background-color: white;
	padding: 32px 28px;
	right: calc(50% - var(--width) / 2);
	border-radius: 8px;
	box-shadow: 0px 0px 8px rgba(40, 90, 185, 0.2);
	overflow-x: auto;
	z-index: 999999999;

	&__backdrop {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.45);
		z-index: 99999999;
	}

	&__header {
		display: flex;
		justify-content: space-between;
	}

	&__close-icon {
		cursor: pointer;
	}

	&__footer {
		display: flex;
		justify-content: end;
		margin-top: auto;
		padding-top: 28px;
	}
}
</style>