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
			<span
				v-if="!loading"
				:class="`cds-timeline-item__pin--${variant}${hollowed ? '--hollowed' : ''}`"
			/>

			<cds-spinner
				v-else
				size="sm"
				class="spinner"
				:variant="variant"
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
import hasSlot from '../utils/methods/hasSlot';

export default {
	components: {
		CdsSpinner,
	},

	props: {
		/**
		* A variante do TimelineItem. São 10 variantes: 'teal', 'green', 'blue',
		* 'violet', 'pink', 'red', 'orange', 'amber', 'gray' e 'dark'.
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
	},

	methods: {
		hasSlot,
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.cds-timeline-item {
	display: flex;

	&__opposite {
		color: $n-600;
		margin: mTRBL(n1, 6, 0, 0);
		@include body-2;
	}

	&__content-container {
		margin: mTRBL(n1, 0 , 8, 6);

	}

	&__title {
		color: $n-900;
		font-weight: 600;
		margin: mb(2);
	}
	
	&__text {
		@include caption;
		color: $n-600;
		font-weight: $font-weight-regular;
	}
	
	&__pin {
		border-radius: $border-radius-circle;
		min-height: 16px !important;
		min-width: 16px !important;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
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
		background-color: $n-40;
		height: 100% !important;
		width: 2px !important;
	}

	.tail--dashed {
		border: 1px dashed $n-40;
		height: 100% !important;
		width: 2px !important;
	}
}

.spinner {
	min-height: 16px !important;
	min-width: 16px !important;
}

</style>
