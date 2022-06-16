<template>
	<div class="loader__container">
		<div class="loader__box">
			<div class="loader__box-color">
				<img
					:src="imageBackground"
					alt="Carregando"
					class="loader__content"
				>
			</div>
			<img
				:src="imageBackground"
				alt="Carregando"
				class="loader__content--shadow"
			>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		*	URL da imagem a ser utilizada como loader.
		*/
		imageBackground:
		{
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>

.loader {
	&__container {
		height: 50vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__content {
		width: 230px;
		position: absolute;
		bottom: 0;

		&--shadow {
			@extend .loader__content;
			-webkit-filter: grayscale(100%);
			filter: grayscale(100%);
		}
	}

	&__box {
		width: 230px;
		height: 90px;
		position: relative;
	}

	&__box-color{
		overflow: hidden;
		width: 230px;
		position: absolute;
		height: 0;
		left: 0;
		bottom: 0;
		-webkit-transition: height 200ms;
		transition: height 200ms;
		animation: switch 4s infinite;
		z-index: 1;
	}
}

@keyframes switch {
	0%, 100% {
		height: 0;
	}

	50% {
		height: 100vh;
	}
}
</style>
