<template>
	<div
		v-if="internalShow"
		class="cds-modal__backdrop"
	>
		<div
			v-if="internalShow"
			class="cds-modal"
			:class="`cds-modal--${size}`"
			:style="dynamicStyle"
			v-on-click-outside="noCloseOnBackdrop ? () => {} : closeHandle"
		>
			<header 
				v-if="!noHeader"
			>
				<!-- @slot Slot usado para utilização de header customizado. -->
				<slot name="header">
					<div class="cds-modal__header">
						<h3>{{ title }}</h3>
						<div
							v-if="!noCloseButton"
							class="cds-modal__close-icon"
							@click="closeHandle"
						>
							<cds-icon
								name="x-outline"
								height="20"
								width="20"
								color="#29333D"
							/>
						</div>
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
						:text="cancelButtonText"
						secondary
						:disabled="disabled"
						@click="closeHandle"
					/>

					<cds-button
						class="footer__ok-button"
						:text="okButtonText"
						variant="green"
						:disabled="disabled"
						@click="okHandle"
					/>
				</slot>
			</footer>
		</div>
	</div>
</template>

<script>
import CdsIcon from '../components/Icon.vue';
import CdsButton from '../components/Button.vue';
import CdsScrollable from '../components/Scrollable.vue';
import vClickOutside from 'click-outside-vue3';

export default {
	directives: {
		'on-click-outside': vClickOutside.directive,
	},

	components: {
		CdsIcon,
		CdsButton,
		CdsScrollable,
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
		 * Define o título do modal exibido no header
		 */
		title: {
			type: String,
			default: 'Título',
		},
		/**
		 * Especifica o tamanho do modal. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
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
		maxBodyHeight() {
			// 90% da largura subtraído o padding vertical (32 * 2) e subtraído o footer e o header
			return `${ window.innerHeight * 0.9 - 32 * 2 - 110 }px`;
		},
	},

	methods: {
		closeHandle() {
			/**
			 * Evento que indica se o modal foi escondido.
			* @event close
			* @type {Event}
			*/
			this.$emit('close', true);
			this.internalShow = !this.internalShow;
		},

		okHandle() {
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
@import '../assets/sass/tokens.scss';

.cds-modal {
	display: flex;
	flex-direction: column;
	max-height: 90%;
	position: absolute;
	width: calc(100% - 2 * 16px);
	height: auto;
	background-color: white;
	padding: pYX(8, 7);
	border-radius: $border-radius-medium;
	box-shadow: 0px 0px 8px rgba(40, 90, 185, 0.2);
	overflow-x: auto;
	z-index: 999999999;
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
		z-index: 99999999;
	}

	&__header {
		display: flex;
		justify-content: space-between;
		padding: pb(7);

		h3 {
			@include subheading-1;
			color: $n-900;
		}
	}

	&__close-icon {
		display: flex;
		cursor: pointer;
	}

	&__footer {
		display: flex;
		justify-content: end;
		margin-top: auto;
		padding: pt(7);

	}
}

.footer__ok-button {
	margin: ml(6);
}

@keyframes zoom-in {
	0% {
		transform:scale(0);
	}
	100% {
		transform:scale(1);
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
</style>