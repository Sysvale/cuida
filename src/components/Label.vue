<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-parsing-error -->
<template>
	<label
		:class="{
			'label': !fluid,
			'label--fluid': fluid,
		}"
	>
		<span
			class="label__content"
		>
			{{ text }}

			<CdsRequiredIndicator v-if="required" />

			<CdsIcon
				v-if="tooltip"
				v-cdstip="tooltip"
				:name="tooltipIcon"
				height="18"
				width="18"
				class="label__icon"
			/>
		</span>

		<CdsLink
			v-if="supportLink"
			:href="supportLinkUrl"
			:text="supportLink"
			class="label__link"
			new-tab
		/>
	</label>
</template>

<script setup>
import CdsRequiredIndicator from './RequiredIndicator.vue';
import vCdstip from '../utils/directives/cdstip';
import CdsLink from './Link.vue';
import CdsIcon from './Icon.vue';

defineProps({
	for: {
		type: String,
		default: '',
	},
	/**
	* Especifica a label do input.
	*/
	text: {
		type: String,
		default: 'Label',
	},
	/**
	* Define exibição e texto do tooltip do input
	*/
	tooltip: {
		type: String,
		default: null,
	},
	/**
	* Especifica ícone do tooltip do TextInput.
	*/
	tooltipIcon: {
		type: String,
		default: 'info-outline',
	},
	/**
	* Controla a exibição e o conteúdo do link de suporte exibido ao lado da label.
	*/
	supportLink: {
		type: String,
		default: null,
	},
	/**
	* Define a url a ser acessada no clique do link de suporte.
	*/
	supportLinkUrl: {
		type: String,
		default: 'https://cuida.framer.wiki/',
	},
	/**
	* Exibe asterisco de obrigatório (obs.: não faz a validação)
	*/
	required: {
		type: Boolean,
		default: false,
	},
	/**
	* Especifica se a largura do TextInput deve ser fluida.
	*/
	fluid: {
		type: Boolean,
		default: false,
		required: false,
	},
});
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;
@use'../assets/sass/placeholders.scss';

.label {
    @include tokens.label;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 266px;

    &--fluid {
        @extend .label;
        width: 100%;
    }

	&__icon {
		margin: tokens.mTRBL(0, 0, n1, 1);
		cursor: default;
		color: tokens.$n-700;
	}

	&__link {
		justify-self: end;
	}

	&__content {
		color: tokens.$n-800;
		margin: tokens.mb(1);
	}
}
</style>