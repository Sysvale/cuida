<template>
	<header
		:class="compact ? 'page-header__container--compact' : 'page-header__container'"
	>
		<div
			class="page-header__text"
		>
			<p class="page-header__title">
				{{ title }}
			</p>

			<p
				class="page-header__subtitle"
			>
				{{ subtitle }}
			</p>
		</div>

		<div class="page-header__aside-slot">
			<slot
				name="aside"
			/>
		</div>
	</header>
</template>
<script>
export default {
	props: {
		/**
		 * O título do PageHeader.
		 */
		title: {
			type: String,
			required: true,
		},
		/**
		 * O subtítulo do alerta.
		 */
		subtitle: {
			type: String,
			default: null,
		},
		/**
		 * Indica se o PageHeader vai tomar o tamanho todo da tela ou não.
		 * No modo compact, o tamanho máximo do header é 50%
		 */
		compact: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
<style lang="scss">
@import '../assets/sass/app.scss';
	.page-header {
		&__container {
			display: flex;
			justify-content: space-between;
			margin: mt(3);

			&--compact {
				@extend .page-header__container;
				width: 50%;
			}
		}

		&__aside-slot {
			display: flex;
			align-items: flex-end;
		}

		&__text{
			width: 70%;
		}

		&__title {
			@include heading-2;
			margin: ma(0);
		}

		&__subtitle {
			@include subheading-3;
			margin: ma(0);
		}
	}
</style>
