<template>
	<div class="panel-card">
		<div class="panel-card__header">
			<div>
				<span class="panel-card__title">{{ title }}</span>
				<br>
				<span class="panel-card__subtitle">{{ subtitle }}</span>
			</div>
			<div class="ml-auto">
				<!-- @slot Slot usado para inserção de elemento à direita no header. -->
				<slot name="panel-actions" />
			</div>
		</div>
		<hr class="panel-card__divider">
		<div :class="contentClass">
			<!-- @slot Slot usado para inserção de conteúdo customizado. -->
			<slot />
		</div>
	</div>
</template>

<script>
export default {
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
@import '../assets/sass/app.scss';

.panel-card {
	background-color: $n-0;
	border-radius: $border-radius-extra-pequeno;

	&__divider {
		@include margin(onidirecional, 0);
		color: $n-300;
	}

	&__header {
		@include padding(onidirecional, 3);
		display: flex;
		min-height: 78px;
	}

	&__content {
		@include padding(onidirecional, 3);
	}

	&__content--no-padding {
		@include padding(onidirecional, 3);
	}

	&__title {
		@include subtitulo-2;
		@include margin(inferior, 1);
		color: $n-900;
	}

	&__subtitle {
		@include subtitulo-3;
		color: $n-500;
	}
}
</style>
