<template>
	<div
		class="skeleton__container"
		:style="computedStyle"
	/>
</template>

<script>
export default {
	props: {
		width: {
			type: String,
			required: false,
		},
		height: {
			type: String,
			required: false,
			default: '16',
		}
	},

	computed: {
		computedStyle() {
			return  {
				'--width': `${this.width}px`,
				'--height': `${this.height}px`,
			};
		},
	},
}
</script>

<style lang="scss" scoped>
	@import '../assets/sass/tokens.scss';

	.skeleton__container {
		position: relative;
		overflow: hidden;
		cursor: wait;
		height: var(--height);
		width: var(--width);
		background-color: $n-30;
		border-radius: $border-radius-lil;
	}

	.skeleton__container:after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 0;
		background: linear-gradient(90deg, transparent, $n-20, transparent);
		animation: loading-animation 1.75s linear infinite;
	}

	@keyframes loading-animation {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translateX(100%);
		}
	}
</style>