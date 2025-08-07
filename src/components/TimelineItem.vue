<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="cds-timeline-item">
		<div class="cds-timeline-item__opposite">
			<!-- @slot Slot utilizado para renderização de conteúdo no lado esquerdo do TimelineItem.-->
			<slot name="opposite" />
		</div>

		<div
			class="cds-timeline-item__timeline-container"
		>
			<cds-spinner
				v-if="loading"
				size="sm"
				class="spinner"
				:variant="variant"
			/>
			<div
				v-else-if="icon"
				class="cds-timeline-item__icon"
			>
				<cds-icon
					:name="icon"
					height="20"
					width="20"
				/>
			</div>
			<span
				v-else
				:class="`cds-timeline-item__pin--${variant}${hollowed ? '--hollowed' : ''}`"
			/>

			<div
				:class="(loading || hollowed) ? 'tail--dashed' : 'tail'"
			/>
		</div>

		<div class="cds-timeline-item__content-container">
			<div
				v-if="hasSlot($slots, 'title')"
				class="cds-timeline-item__title"
			>
				<!-- @slot Slot utilizado para renderização do título do TimelineItem.-->
				<slot name="title" />
			</div>

			<span class="cds-timeline-item__text">
				<!-- @slot Slot utilizado para renderização do conteúdo do TimelineItem. Os elementos adicionados nesse slot ficam dispostos abaixo do título. -->
				<slot name="content" />
			</span>
		</div>
	</div>
</template>

<script>
import CdsSpinner from './Spinner.vue';
import CdsIcon from './Icon.vue';
import hasSlot from '../utils/methods/hasSlot';

export default {
	name: 'TimelineItem',
	components: {
		CdsIcon,
		CdsSpinner,
	},

	props: {
		/**
		* A variante de cor. São 10 variantes:
		* @values 'green', 'teal', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'dark'
		*/
		variant: {
			type: String,
			default: 'green',
		},
		/**
		* Altera o estado do pin. Quando true torna o pin em um `Cds-spinner`.
		*/
		loading: {
			type: Boolean,
			default: false,
		},
		/**
		* Altera o estado do pin. Quando true deixa o pin sem preenchimento, apenas com borda.
		*/
		hollowed: {
			type: Boolean,
			default: false,
		},
		/**
		* Define o ícone a ser exibido no lugar do pin do TimelineItem. Caso não informado, o pin será exibido.
		*/
		icon: {
			type: String,
			default: null,
		},
	},

	methods: {
		hasSlot,
	},
};
</script>
<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.cds-timeline-item {
	display: flex;

	&__opposite {
		color: tokens.$n-600;
		margin: tokens.mTRBL(n1, 6, 0, 0);
		@include tokens.body-2;
	}

	&__content-container {
		margin: tokens.mTRBL(n1, 0 , 8, 6);

	}

	&__icon {
		padding: tokens.pb(1);
		margin: tokens.mt(n1)
	}

	&__title {
		color: tokens.$n-900;
		font-weight: 600;
		margin: tokens.mb(2);
	}
	
	&__text {
		@include tokens.caption;
		color: tokens.$n-600;
		font-weight: tokens.$font-weight-regular;
	}
	
	&__pin {
		border-radius: tokens.$border-radius-circle;
		min-height: 16px !important;
		min-width: 16px !important;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: $base-color;
			@extend .cds-timeline-item__pin;

			&--hollowed {
				border: 4px solid $base-color;
				box-sizing: border-box;	
				@extend .cds-timeline-item__pin;
			}
		}
	}

	&__timeline-container {
		align-items: center;
		display: flex;
		flex-direction: column;
	}
	
	.tail {
		background-color: tokens.$n-40;
		height: 100% !important;
		width: 2px !important;
	}

	.tail--dashed {
		border: 1px dashed tokens.$n-40;
		height: 100% !important;
		width: 2px !important;
	}
}

.spinner {
	min-height: 16px !important;
	min-width: 16px !important;
}

</style>
