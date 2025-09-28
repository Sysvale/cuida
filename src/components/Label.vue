<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-parsing-error -->
<template>
	<label
		v-if="text"
		:class="{
			'label': !fluid,
			'label--fluid': fluid,
		}"
	>
		<CdsFlexbox
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
		</CdsFlexbox>

		<CdsLink
			v-if="shouldShowLink"
			:href="supportLinkUrl"
			:text="supportLink"
			class="label__link"
			new-tab
		/>

		<span
			v-else
			class="label__link"
			@click="emits('supportLinkClick')"
		>
			{{ supportLink }}
		</span>
	</label>
</template>

<script setup>
import { computed } from 'vue';
import CdsRequiredIndicator from './RequiredIndicator.vue';
import vCdstip from '../utils/directives/cdstip';
import CdsLink from './Link.vue';
import CdsIcon from './Icon.vue';
import CdsFlexbox from './Flexbox.vue';

defineOptions({ name: 'Label' });

const props = defineProps({
	/**
	 * ID de referência ao input.
	 */
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
		type: [String, null],
		default: null,
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

const emits = defineEmits(['supportLinkClick']);

const shouldShowLink = computed(() => (
	props.supportLink
	&& props.supportLinkUrl !== null
	&& props.supportLinkUrl.length
));
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
		@include tokens.caption;
		justify-self: end;
		color: tokens.$bn-400;
		transition: tokens.$interaction;
		cursor: pointer;
		margin: tokens.mb(1);
	}

	&__content {
		color: tokens.$n-800;
		margin: tokens.mb(1);
	}
}
</style>