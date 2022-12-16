<template>
	<header class="mt-3">
		<div class="d-flex justify-content-between">
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

			<div class="d-flex align-items-end">
				<slot
					name="aside"
				/>
			</div>
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
