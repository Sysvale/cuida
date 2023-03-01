<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<cds-box
		padding="0"
		:clickable="clickable"
		@boxClick="handleClick"
	>
		<div class="card__extra-container">
			<div class="card__extra">
				<!-- @slot Slot para incluir conteúdo adicional no canto superior direito do card.-->
				<slot name="extra" />
			</div>
		</div>

		<div :class="{'card--horizontal': this.horizontal}">
			<div
				v-if="hasSlot($slots, 'image')"
			>
				<!-- @slot Slot utilizado para incluir imagens no Card.-->
				<slot name="image" />
			</div>
	
			<div
				v-else-if="imageSrc"
				class="card__image"
			>
				<cds-image
					:src="imageSrc"
					:width="imageWidth"
					:height="imageHeight"
					:alt="imageAlt"
				/>
			</div>
			
			<div
				v-else-if="hasSlot($slots, 'icon')"
				class="card__icon"
			>
				<!-- @slot Slot utilizado para incluir ícones no Card.-->
				<slot name="icon" />
			</div>

			<div
				class="card__spacer"
			>
				<div
					v-if="hasSlot($slots, 'header')"
					class="card__header"
				>
					<!-- @slot Slot para conteúdo customizado do Header.-->
					<slot name="header" />
				</div>

				<div v-else="title">
					<p class="card__header">{{ title }}</p>
				</div>
		
				<div
					v-if="hasSlot($slots, 'body')"
					class="card__body"
				>
					<!-- @slot Slot para conteúdo customizado do Body.-->
					<slot name="body" />
				</div>

				<div v-else="content">
					<p class="card__body">{{ content }}</p>
				</div>
		
				<div
					v-if="hasSlot($slots, 'footer')"
					class="card__footer"
				>
					<!-- @slot Slot para conteúdo customizado do Footer.-->
					<slot name="footer" />
				</div>
			</div>
		</div>
	</cds-box>
</template>

<script>
import CdsBox from './Box.vue';
import CdsImage from './Image.vue';

import hasSlot from '../utils/methods/hasSlot';

export default {
	components: {
		CdsBox,
		CdsImage,
	},

	props: {
		/**
		* Especifica o título do card. Quando conteúdo é enviado para o slot `Header` o conteúdo dessa prop não é exibido.
		*/
		title: {
			type: String,
			default: '',
		},
		/**
		* Especifica texto do Card. Quando conteúdo é enviado para o slot `Body` o conteúdo dessa prop não é exibido.
		*/
		content: {
			type: String,
			default: '',
		},
		/**
		* Caminho da imagem que vai ser renderizada. Quando conteúdo é enviado para o slot `Image` o conteúdo dessa prop não é exibido.
		*/
		imageSrc: {
			type: String,
			default: '',
		},
		/**
		* Descrição em texto da imagem.
		*/
		imageAlt: {
			type: String,
			default: 'imagem do card',
		},
		/**
		* Largura da imagem do card.
		*/
		imageWidth: {
			type: [String, Number],
			default: 300,
		},
		/**
		* Altura da imagem do card.
		*/
		imageHeight: {
			type: [String, Number],
			default: 180,
		},
		/**
		* Largura do conteúdo do card.
		*/
		bodyWidth: {
			type: [String, Number],
			default: 300,
		},
		/**
		* Torna o alinhamento do Card horizontal.
		*/
		horizontal: {
			type: Boolean,
			default: false,
		},
		/**
		* Ativa ou desativa o clique no componente
		*/
		clickable: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		imageWidthResolver() {
			return this.horizontal ? 'fit-content' :  `${this.imageWidth}px`;
		},

		bodyWidthResolver() {
			return `${this.bodyWidth}px`;
		},
	},

	methods: {
		hasSlot,

		handleClick() {
			if (this.clickable) {
				/**
				* Evento que indica se o card foi clicado.
				* @event cardClick
				* @type {Event}
				*/
				this.$emit('cardClick', true);
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.card {
	&__icon {
		padding: pTRBL(5, 0, 5, 5);
	}
	
	&__extra-container {
		position: relative;
	}
	
	&__extra {
		margin-top: 20px;
		position: absolute;
		right: 16px;
		z-index: 9999;
	}
	
	&__image {
		display: flex;
	}
	
	&--horizontal {
		align-items: center;
		display: flex;
	}
	
	&__header {
		@include subheading-2;
		color: $n-700;
		margin: ma(0);
	}
	
	&__body {
		@include body-2;
		color: $n-500;
		line-height: 150%;
		margin: mt(3);
		max-width: v-bind(bodyWidthResolver);
	}
	
	&__spacer {
		padding: pa(5);
		max-width: v-bind(imageWidthResolver);
	}
	
	&__footer {
		margin: mt(0);
	}
}
</style>
