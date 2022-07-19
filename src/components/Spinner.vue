<template>
	<span class="cds-spinner">
		<div class="spinner__circle"/>
		<div class="spinner"/>
		<div> {{ label }} </div>
	</span>
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

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.spinner__circle {
	width: 15px;
	height: 15px;
	background: red;
	border-radius: 100%;
	position: absolute;
	top: 50%;
}

.spinner {
	animation: rotate 1s linear infinite;
	background: $gp-500;
	border-radius: 50%;
	height: 120px;
	width: 120px;
	position: relative;
}

.spinner::before,
.spinner::after {
	content: '';
	position: absolute;
}

.spinner::before {
	border-radius: 50%;
	background:
		linear-gradient(0deg,   hsla(0, 0%, 100%, 1  ) 50%, hsla(0, 0%, 100%, 0.9) 100%)   0%   0%,
		linear-gradient(90deg,  hsla(0, 0%, 100%, 0.9)  0%, hsla(0, 0%, 100%, 0.6) 100%) 100%   0%,
		linear-gradient(180deg, hsla(0, 0%, 100%, 0.6)  0%, hsla(0, 0%, 100%, 0.3) 100%) 100% 100%,
		linear-gradient(360deg, hsla(0, 0%, 100%, 0.3)  0%, hsla(0, 0%, 100%, 0  ) 100%)   0% 100%
	;
	background-repeat: no-repeat;
	background-size: 50% 50%;
	top: -1px;
	bottom: -1px;
	left: -1px;
	right: -1px;
}

.spinner::after {
	background: white;
	border-radius: 50%;
	top: 12%;
	bottom: 12%;
	left: 12%;
	right: 12%;
}
</style>
