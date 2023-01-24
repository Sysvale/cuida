<template>
	<span id="callout-card">
		<div :class="resolveClass('callout-card__container')">
			<div class="image__container">
				<img
					:class="resolveClass('image__content')"
					:src="image"
					:alt="imageDescription"
				>
			</div>
			<div :class="resolveClass('content__container')">
				<div :class="resolveClass('content')">
					<p class="content__title">
						{{ title }}
					</p>

					<span class="content__text">
						<!-- @slot Slot usado para inserção de conteúdo customizado no texto. -->
						<slot name="text">
							{{ text }}
						</slot>
					</span>
				</div>
				<div>
					<!-- @slot Slot usado para inserção de conteúdo customizado no lugar do botão de ação. -->
					<slot name="action">
						<!--
							Evento que indica que o Botão foi clicado
							@event action-button-click
							@type {Event}
						-->
						<cds-button
							id="content-button"
							:variant="actionButtonVariant"
							:text="actionButtonText"
							:secondary="actionButtonSecondary"
							:disabled="actionButtonDisabled"
							@click="$emit('action-button-click', true)"
						/>
					</slot>
				</div>
			</div>
		</div>
	</span>
</template>

<script>
import CdsButton from './Button.vue';

export default {
	components: {
		CdsButton,
	},

	props: {
		/**
		 * O título do card. O título também pode ser usado com o slot.
		 */
		title: {
			type: String,
			default: 'Título do AlertCard',
			required: true,
		},
		/**
		 * O texto do card. O texto também pode ser usado com o slot.
		 */
		text: {
			type: String,
			default: 'Subtítulo do AlertCard',
		},
		/**
		 * A imagem do card.
		 */
		image: {
			type: String,
			default: '',
			required: true,
		},
		/**
		 * A descrição da imagem do card.
		 */
		imageDescription: {
			type: String,
			default: 'Imagem de CalloutCard',
		},
		/**
		 * A cor do botão do card.
		 */
		actionButtonVariant: {
			type: String,
			default: 'green',
		},
		/**
		 * O texto do botão do card.
		 */
		actionButtonText: {
			type: String,
			default: 'Ok',
		},
		/**
		 * A versão secundária do botão.
		 */
		actionButtonSecondary: {
			type: Boolean,
			default: false,
		},
		/**
		 * A versão disabled do botão.
		 */
		actionButtonDisabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Modo de exibição do card.
		 */
		compact: {
			type: Boolean,
			default: false,
		},
	},

	methods: {
		resolveClass(element) {
			return this.compact ? `${element}--compact` : element;
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

#callout-card .callout-card {
	align-items: center;
	display: flex;
	border: 1px solid $n-40;
	border-radius: 16px;
	padding: pa(7);

	&__container {
		@extend .callout-card;
		width: 700px;

		&--compact {
			@extend .callout-card;
			padding: pYX(2,6);
		}
	}

	&__content-container {
		width: 20%;
	}
}

#callout-card .image {
	&__container {
		margin: mr(7);
	}

	&__content {
		max-height: 150px;
		max-width: 150px;

		&--compact {
			max-height: 90px;
			max-width: 120px;
		}
	}
}

#callout-card .content {
	margin: mb(4);

	&--compact {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 529px;
	}

	&__title {
		color: $n-700;
		display: block;
		@include subheading-3;
		margin: mb(2);
	}

	&__text {
		color: $n-700;
		@include body-2;
	}

	&__container {
		&--compact {
			align-items: center;
			display: flex;
			justify-content: space-between;
			width: 100%;
		}
	}
}
</style>
