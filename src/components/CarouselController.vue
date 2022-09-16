<template>
	<div >
		<div class="carousel-controller">
			<span
				class="carousel-controller__chevron--left"
			/>
			<span
				class="text"
			>
				4 de 8
			</span>
			<span
				class="value"
			>
				Métricas
			</span>
			<span
				class="carousel-controller__chevron--right"
			/>
		</div>
	</div>
</template>

<script>
	export default {
		props: {

		}
	}
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';
.text {
	margin: ml(7);
	font-size: 14px;
	color: $n-500;
	font-weight: $font-weight-semibold;
}

.value {
	margin: mTRBL(0, 7, 0, 2);
	font-size: 14px;
	color: $n-800;
	font-weight: $font-weight-semibold;
}
.carousel-controller {
	position: relative;
	width: fit-content;
	display: flex;
	align-items: center;
}
.carousel-controller__chevron--left {
	display: block;
	height: 32px;
	width: 32px;
	cursor: pointer;
	border-radius: $border-radius-small;
	display: flex;
	align-items: center;
	justify-content: center;

	&::before,
	&::after {
		content: '';
		width: 0;
		height: 0;
	}

	&::before {
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid $n-200;
		border-radius: $border-radius-small;
		transition: all 300ms ease-in-out;
		transform: rotate(-90deg);
	}
}

.carousel-controller__chevron--right {
	display: block;
	height: 32px;
	width: 32px;
	cursor: pointer;
	border-radius: $border-radius-small;
	display: flex;
	align-items: center;
	justify-content: center;

	&::before,
	&::after {
		content: '';
		width: 0;
		height: 0;
	}

	&::before {
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid $n-200;
		border-radius: $border-radius-small;
		transition: all 300ms ease-in-out;
		transform: rotate(90deg);
	}
}
</style>