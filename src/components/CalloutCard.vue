<template>
	<span id="callout-card">
		<div
			class="callout-card__container"
			:class="alertCardContainerSelected"
		>
			<div class="image__container">
				<img
					class="image__content"
					:src="image"
					:alt="imageDescription"
				/>
			</div>
			<div class="content">
				<div class="content__text">
					<span class="content__title">
						{{ title }}
					</span>
	
					<!-- @slot Slot usado para inserção de conteúdo customizado no subtítulo. -->
					<span class="content__subtitle">
						<slot name="subTitle-slot">
							{{ subTitle }}
						</slot>
					</span>
				</div>
				<div>
					<cds-button
						id="content-button"
						:variant="actionButtonColor"
						:text="actionButtonText"
					/>
				</div>
			</div>
		</div>
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * O título do alerta. O título também pode ser usado com o slot.
		 */
		title: {
			type: String,
			default: 'Título do AlertCard',
			required: true,
		},
		/**
		 * O subtítulo do alerta. O subtítulo também pode ser usado com o slot.
		 */
		subTitle: {
			type: String,
			default: 'Subtítulo do AlertCard',
		},
		/**
		 * O subtítulo do alerta. O subtítulo também pode ser usado com o slot.
		 */
		image: {
			type: String,
			default: '',
		},
		/**
		 * O subtítulo do alerta. O subtítulo também pode ser usado com o slot.
		 */
		imageDescription: {
			type: String,
			default: 'Imagem de CalloutCard',
		},
		/**
		 * O subtítulo do alerta. O subtítulo também pode ser usado com o slot.
		 */
		actionButtonVariant: {
			type: String,
			default: 'primary',
		},
		/**
		 * O subtítulo do alerta. O subtítulo também pode ser usado com o slot.
		 */
		actionButtonText: {
			type: String,
			default: 'Botão',
		},
		/**
		 * O subtítulo do alerta. O subtítulo também pode ser usado com o slot.
		 */
		actionButtonColor: {
			type: String,
			default: 'green',
		},
	},

	data() {
		return {
		};
	},

	computed: {
		alertCardContainerSelected() {
		},
	},

	methods: {
	},
};
</script>

<style lang="scss">
@import '../assets/sass/app.scss';

#callout-card .callout-card {
	display: flex;
	align-items: center;
	padding: pa(7);
	border-radius: 16px;

	&__container {
		@extend .callout-card;
		border: 1px solid $n-40;
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
		max-width: 200px;
		max-height: 200px;
	}
}

#callout-card .content {
	&__title {
		@include subheading-2;
		display: block;
	}

	&__subtitle {
		@include subheading-3;
		margin: mb(4);
		display: block;
		color: $n-600;
	}
}

#content-button button {
}

</style>
