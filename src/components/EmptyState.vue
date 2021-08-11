<template>
	<div
		class="empty-state"
	>
		<img
			class="empty-state__image"
			:src="emptyStateImage"
			:alt="imgDescription"
		/>

		<div class="empty-state__title">
			{{ title }}
		</div>

		<div class="empty-state__text">
			<!-- @slot Slot usado para inserção de conteúdo customizado no texto do corpo do empty state. -->
			<slot name="text">
				{{ text }}
			</slot>
		</div>

		<!--
			Evento emitido quando o botão do Empty State é clicado
			@event action-button-click
			@type {Event}
		-->
		<button
			v-if="showActionButton"
			class="empty-state__button"
			@click="$emit('action-button-click', true)"
		>
			{{ buttonText }}
		</button>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * A imagem a ser mostrada no Empty State. Obs.: o addon Controls
		 * do Storybook ainda não permite a seleção de arquivos. Desse modo
		 * não é possível testar o funcionamento dessa prop por aqui.
		 */
		emptyStateImage: {
			type: String,
			default: '',
		},
		/**
		 * O descritor da imagem do Empty State adicionado à 'alt' da tag <img>
		 */
		imgDescription: {
			type: String,
			default: 'Imagem de Empty State',
		},
		/**
		 * O título do Empty State.
		 */
		title: {
			type: String,
			default: 'Título do empty state',
			required: true,
		},
		/**
		 * O texto instrutivo do Empty State
		 */
		text: {
			type: String,
			default: 'Para sair dessa situação de empty state, realize a ação abaixo.',
		},
		/**
		 * Prop utilizada para mostrar ou ocultar o botão de ação do Empty State.
		 */
		showActionButton: {
			type: Boolean,
			default: true,
		},
		/**
		 * O texto mostrado no botão de ação do Empty State
		 */
		buttonText: {
			type: String,
			default: 'Finalizar',
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	margin: ma(12);

	&__image {
		max-width: 500px;
		max-height: 500px;
		width: auto;
		height: auto;
	}

	&__title {
		margin: mt(12);
		color: $cinza-9;
		font-size: 28px;
	}

	&__text {
		margin: mt(2);
		color: $cinza-7;
		font-size: 16px;
		max-width: 50%;
		text-align: center;
	}

	&__button {
		margin: mt(4);
		background-color: $verde-piccolo-base;
		color: $branco;
		border-radius: 4px;
		font-weight: 600;
		border: none;
		padding: pYX(2, 3);

		&:hover {
			background-color: $verde-piccolo-dark-1;
		}

		&:focus {
			outline: 0px;
		}
	}
}
</style>
