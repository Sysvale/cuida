<template>
	<div id="cds-spinner">
		<div class="spinner"/>
		<div> {{ label }} </div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		*	URL da imagem a ser utilizada como loader.
		*/
		label:
		{
			type: String,
			required: false,
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

$spinner-width: 8px;
$spinner-color: #239F78;

.spinner {
	border-width: $spinner-width;
	border-style: solid;
	border-color: $spinner-color $spinner-color $spinner-color transparent;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	animation: spin 1.5s infinite;
	position: relative;

	margin: 6em auto;

	&:before, &:after {
		content: '';
		width: $spinner-width;
		height: $spinner-width;
		border-radius: 50%;
		background: $spinner-color;
		position: absolute;
		left: $spinner-width;
	}

	&:before {
		top: $spinner-width;
	}
	
	&:after {
		bottom: $spinner-width;
	}
}

@keyframes spin {
	100% {
		transform: rotate(360deg);
	}
}
</style>
