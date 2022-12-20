<template>
	<header class="page-header__container">
		<div>
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
	},
};
</script>
<style lang="scss">
@import '../assets/sass/app.scss';
	.page-header {
		&__container {
			display: flex;
			justify-content: space-between;
			margin: mTRBL(3, 0, 2, 0);
		}

		&__aside-slot {
			display: flex;
			align-items: flex-end;
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
