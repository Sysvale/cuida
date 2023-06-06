<template>
	<cds-box
		class="panel-card"
		padding="0"
		fluid
	>
		<div class="panel-card__header">
			<div>
				<span class="panel-card__title">{{ title }}</span>
				<br>
				<span class="panel-card__subtitle">{{ subtitle }}</span>
			</div>
			<div>
				<!-- @slot Slot usado para inserção de elemento à direita no header. -->
				<slot name="panel-actions" />
			</div>
		</div>

		<cds-divider dimmed />

		<div :class="contentClass">
			<!-- @slot Slot usado para inserção de conteúdo customizado. -->
			<slot />
		</div>
	</cds-box>
</template>

<script>
import CdsBox from './Box.vue';
import CdsDivider from './Divider.vue';

export default {
	components: {
		CdsBox,
		CdsDivider,
	},

	props: {
		/**
		 * Título do card.
		 */
		title: {
			type: String,
			default: 'Título',
			required: true,
		},
		/**
		 * Subtítulo do card.
		 */
		subtitle: {
			type: String,
			default: 'Subtítulo',
			required: true,
		},
		/**
		 * Remove o padding padrão do corpo do card.
		 */
		noContentPadding: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		contentClass() {
			if (this.noContentPadding) {
				return 'panel-card__content--no-pading';
			}
			return 'panel-card__content';
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.panel-card {
	&__divider {
		margin: ma(0);
		color: $n-300;
	}

	&__header {
		padding: pa(4);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__content {
		padding: pa(4);
	}

	&__content--no-padding {
		padding: pa(4);
	}

	&__title {
		@include subheading-2;
		margin: mb(2);
		color: $n-900;
	}

	&__subtitle {
		@include body-2;
		color: $n-500;
	}
}
</style>
