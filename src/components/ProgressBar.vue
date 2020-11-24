<template>
	<span
		id="progressBar"
	>
		<div
			class="bar"
		>
			<span
				v-if="showText"
				class="bar__text"
			>
				{{ formatedPercentage }}
			</span>
			<div
				class="bar__content"
				:style="backgroundColorStyle"
			>
				<div
					class="bar__indicator"
					:style="progressIndicatorStyle"
				/>
			</div>
		</div>
	</span>
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

<style lang="scss" scoped>
#progressBar .bar {
	display: flex;
	align-items: center;
	flex-direction: column;

	&__content {
		background-color: var(--backgroundColor);
		border-radius: 80px;
		width: 100%;
		height: 7px;
	}

	&__indicator {
		border-radius: 80px;
		height: 7px;
		background-color: var(--color);
		width: var(--width);
	}

	&__text {
		font-weight: 600;
	}
}
</style>
