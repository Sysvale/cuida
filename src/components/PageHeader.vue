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
		title: {
			type: String,
			required: true,
		},
		subtitle: {
			type: String,
			default: null,
		},
		compact: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
<style lang="scss">
@import '../assets/sass/tokens.scss';
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

		&__text {
			width: 80%;
		}

		&__title {
			@include heading-2;
			color: $n-900;
			margin: mb(2);
		}

		&__subtitle {
			@include body-1;
			color: $n-700;
			margin: ma(0);
		}
	}
</style>
