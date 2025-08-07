<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		class="link__container"
		:class="{
			'link__container--sm': size === 'sm',
			'link__container--md': size === 'md',
			'link__container--lg': size === 'lg',
			'link__container--bold': bold,
		}"
	>
		<a
			:href="href"
			:target="newTab ? '_blank' : null"
		>
			<!-- @slot Slot padrão para renderização de conteúdo customizado do texto do link. -->
			<slot class="link__text">
				{{ text }}
			</slot>
		</a>
	</div>
</template>

<script>
export default {
	name: 'Link',
	props: {
		/**
		*	URL de redirecionamento.
		*/
		href: {
			type: String,
			required: true,
		},
		/**
		*   Prop utilizada para o redirecionamento do link ser a partir de uma nova aba.
		*/
		newTab: {
			type: Boolean,
			default: false,
		},
		/**
		*	Texto utilizado no endereço da URL para o usuário.
		*/
		text: {
			type: String,
			required: true,
		},
		/**
		*	Texto utilizado no endereço da URL para o usuário.
		*/
		size: {
			type: String,
			default: 'md',
		},
		/**
		*	Texto utilizado no endereço da URL para o usuário.
		*/
		bold: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
<style lang="scss">
@use '../assets/sass/tokens/index' as tokens;

.link__container {
	display: inline;
	width: auto;

	a {
		color: tokens.$bn-400;
		text-decoration: none;
		transition: tokens.$interaction;
		border-bottom: 1px solid transparent;
	}

	a:visited {
		color: tokens.$bn-500;
	}

	a:hover {
		color: tokens.$bn-500;
		border-bottom: 1px solid tokens.$bn-500;
		transition: tokens.$interaction;
		cursor: pointer;
	}

	&--sm > a {
		@include tokens.caption;
	}

	&--md > a {
		@include tokens.body-2;
	}

	&--lg > a {
		@include tokens.body-1;
	}

	&--bold > a {
		font-weight: tokens.$font-weight-bold;
	}
}
</style>
