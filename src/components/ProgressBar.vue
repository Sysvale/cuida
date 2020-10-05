<template>
	<div
		class="progress-bar-container"
	>
		<span
			v-if="showText"
			class="text-style"
		>
			{{ formatedPercentage }}
		</span>
		<div
			class="progress-bar-background"
			:style="backgroundColorStyle"
		>
			<div
				class="progress-indicator"
				:style="progressIndicatorStyle"
			/>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * Define a cor da ProgressBar.
		 */
		color: {
			type: String,
			default: '#2EB88D',
			required: false,
		},
		/**
		 * Define a cor de background da ProgressBar.
		 */
		backgroundColor: {
			type: String,
			default: '#DDE2E7',
			required: false,
		},
		/**
		 * Define a largura da ProgressBar.
		 */
		percentage: {
			type: Number,
			default: 0,
			required: true,
		},
		/**
		 * Define se a porcentagem vai ser mostrada.
		 */
		showText: {
			type: Boolean,
			default: true,
			description: 'Defines if the text will be displayed',
			required: false,
		},
	},

	computed: {
		backgroundColorStyle() {
			return {
				'--backgroundColor': this.backgroundColor,
			};
		},

		formatedPercentage() {
			return `${parseInt(this.percentage * 100, 10)}%`;
		},

		progressIndicatorStyle() {
			return {
				'--width': this.formatedPercentage,
				'--color': this.color,
			};
		},
	},
};
</script>

<style scoped>
.progress-indicator {
		border-radius: 80px;
		height: 7px;
		background-color: var(--color);
		width: var(--width);
}

.progress-bar-background {
		background-color: var(--backgroundColor);
		border-radius: 80px;
		width: 100%;
		height: 7px;
}

.progress-bar-container {
		display: flex;
		align-items: center;
		flex-direction: column;
}

.text-style {
		font-weight: 600;
}
</style>
