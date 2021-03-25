<template>
	<div class="custom-card">
		<div class="custom-card__header">
			<div>
				<p class="custom-card__title">{{ title }}</p>
				<span class="custom-card__subtitle">{{ subtitle }}</span>
			</div>
			<div class="ml-auto">
				<!-- @slot Slot usado para inserção de componente à direita no header. -->
				<slot name="header-right-container">
					<div>X</div>
				</slot>
			</div>
		</div>
		<hr class="custom-card__divider">
		<!-- @slot Slot usado para inserção de conteúdo customizado. -->
		<div class="custom-card__content">
			<slot>
				<div>
					Content
				</div>
			</slot>
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
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.custom-card {
	background-color: #F5F5F5;
	border-radius: $border-radius-extra-pequeno;

	&__divider {
		@include margin(onidirecional, 0);
		color: $cinza-3;
	}

	&__header {
		@include padding(onidirecional, 3);
		display: flex;
		min-height: 78px;
	}

	&__content {
		@include padding(onidirecional, 3);
	}

	&__title {
		@include subtitulo-2;
		@include margin(inferior, 1);
		color: $cinza-9;
	}

	&__subtitle {
		@include subtitulo-3;
		color: $cinza-6;
	}
}
</style>