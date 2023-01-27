<template>
	<div>
		<div class="loading-bar__container">
			<div class="loading-bar" />
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

@mixin animation($animation) {
	-webkit-animation: $animation;
	-o-animation: $animation;
	animation: $animation;
}

@-webkit-keyframes loading-bar-stripes {
	from {
		background-position: 40px 0;
	}
	to {
		background-position: 0 0;
	}
}

@keyframes loading-bar-stripes {
	from {
		background-position: 40px 0;
	}
	to {
		background-position: 0 0;
	}
}

.loading-bar__container {
	display: flex;
	overflow: hidden;
	border-radius: $border-radius-small;
	height: 12px;
	transform: rotate(180deg);
}

.loading-bar {
	background-color: $gp-500;
	background-size: 40px 40px;
	width: 100%;
	@include animation(loading-bar-stripes 2s linear infinite);

	background-image: -webkit-linear-gradient(
		-45deg,
		#ffffff26 25%,
		transparent 25%,
		transparent 50%,
		#ffffff26 50%,
		#ffffff26 75%,
		transparent 75%,
		transparent
	);

	background-image: -o-linear-gradient(
		-45deg,
		#ffffff26 25%,
		transparent 25%,
		transparent 50%,
		#ffffff26 50%,
		#ffffff26 75%,
		transparent 75%,
		transparent
	);

	background-image: linear-gradient(
		-45deg,
		#ffffff26 25%,
		transparent 25%,
		transparent 50%,
		#ffffff26 50%,
		#ffffff26 75%,
		transparent 75%,
		transparent
	);
}
</style>
