<!-- eslint-disable vue/html-quotes -->
<template>
	<div>
		<div
			class="color-swatch__grid"
		>
			<copy-token
				:target="target"
				:value="clipboardValue"
			/>

			<div
				v-for="(swatch, idx) in palete"
				:key="idx"
			>
				<div
					v-for="(color, index) in swatch.colorData"
					:id="color.token"
					:key="color.token"
					class="color-swatch"
					:class="colorSwatchContainer(color.token)"
					@click="handleClick(color.token, color[colorFormatArray[idx]])"
				>
					<div
						v-if="index === 0"
					>
						<div class="color-swatch__header">
							<span
								class="color-swatch__name"
								:class="fontColorResolver(color.shade)"
							>
								{{ swatch.colorName }}
							</span>
	
							<div
								class="color-swatch__format-select"
								@click.stop="handlePop(idx)"
							>
								<cds-icon
									height="18"
									width="18"
									name="unfold-vertical-outline"
									:class="fontColorResolver(color.shade)"
								/>

								<div :class="fontColorResolver(color.shade)">
									{{ colorFormatArray[idx] === 'shade' ? 'HEX' : 'Token' }}
								</div>
							</div>
						</div>
						<br>
						<div class="color-swatch__color">
							<cds-icon
								height="20"
								width="20"
								name="copy-outline"
								:class="fontColorResolver(color.shade)"
							/>

							<div :class="fontColorResolver(color.shade)">
								{{ color[colorFormatArray[idx]] }}
							</div>
						</div>
					</div>

					<div
						v-else
						class="color-swatch__color"
					>
						<cds-icon
							height="20"
							width="20"
							name="copy-outline"
							:class="fontColorResolver(color.shade)"
						/>

						<div :class="fontColorResolver(color.shade)">
							{{ color[colorFormatArray[idx]] }}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div>
			<h5 class="gradient-container__title">
				Gradiente
			</h5>
			<div
				id="linear-gradient($bg-gradient)"
				class="gradient-container"
				@click="handleClick('linear-gradient($bg-gradient)', 'linear-gradient($bg-gradient)')"
			>
				<cds-icon
					height="20"
					width="20"
					name="copy-outline"
				/>

				linear-gradient($bg-gradient)
			</div>
		</div>
	</div>
</template>

<script>
import CdsIcon from '../components/Icon.vue';
import CopyToken from '../docs-components/CopyToken.vue';
import sassColorVariables from '../assets/sass/tokens/colors.module.scss';
import paleteBuilder from '../utils/methods/paleteBuilder.js';
import ContrastChecker from '../utils/methods/contrastChecker';

export default {
	components: {
		CdsIcon,
		CopyToken,
	},

	data() {
		return {
			target: '',
			clipboardValue: '',
			colorFormatArray: [],
			currentIndex: 0,
			sassColorVariables,
		};
	},

	computed: {
		palete() {
			return this.paleteBuilder(this.sassColorVariables.palete);
		},
	},

	mounted() {
		this.colorFormatArray = this.palete.map(() => {
			return 'token';
		});
	},

	methods: {
		paleteBuilder,
		ContrastChecker,

		handleClick(target, val) {
			this.clipboardValue = val;
			this.target = target;
		},

		handlePop(index) {
			this.colorFormatArray[index] = this.colorFormatArray[index] === 'token' ? 'shade' : 'token';
			this.currentIndex = index;
		},

		fontColorResolver(shade) {
			return ContrastChecker(shade, '#FFFFFF', 'POOR') ? 'font-color--white' : 'font-color--black';
		},

		colorSwatchContainer(shade) {
			return `color-swatch--${shade.replace('$', '')}`;
		}
	},
};
</script>

<style lang="scss" scoped>
@use './../assets/sass/tokens/index' as tokens;

.color-swatch {
	&:nth-child(1) {
		border-radius: 16px 16px 0px 0px;
		height: 100px;
	}

	&:last-child {
		border-radius: 0px 0px 16px 16px;
	}

	&__grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		row-gap: 50px;
	}

	&__format-select {
		display: flex;
		align-items: center;
		gap: 2px;
		font-weight: tokens.$font-weight-semibold;
	}

	&__name {
		font-weight: 700;
		color: tokens.$n-800;
	}

	&__header {
		display: flex;
		justify-content: space-between;
	}

	&__color {
		display: flex;
		align-items: center;
		gap: 4px;
		height: -webkit-fill-available;
		font-weight: 500;
		color: tokens.$n-900 !important;
	}

	@include tokens.paleteResolver using ($color) {
		background-color: $color;
		width: 320px;
		height: 72px;
		padding: tokens.pYX(4, 5);
		transform: scale(1);
		transition: all .25s ease-in-out;
		cursor: pointer;
		box-sizing: border-box;

		&:hover {
			box-shadow: 0 2px 4px #00000014, 0 12px 20px #0000001f;
			transform: scale(1.04);
			z-index: 2;
			transition: all .25s ease-in-out;
			border-radius: 4px;
		}
	}
}

.gradient-container {
	font-weight: 500;
	background: linear-gradient(tokens.$bg-gradient);
	height: 388px;
	width: 94%;
	border-radius: tokens.$border-radius-medium;
	outline: 1px solid tokens.$n-20;
	display: flex;
	gap: 4px;
	align-items: flex-end;
	justify-content: end;
	padding: tokens.pa(4);
	cursor: pointer;
	transform: scale(1);
	transition: all .25s ease-in-out;

	&:hover {
		box-shadow: 0 2px 4px #00000014, 0 12px 20px #0000001f;
		transform: scale(1.04);
		z-index: 2;
		transition: all .25s ease-in-out;
	}

	&__title {
		margin: tokens.mTRBL(10, 0, 3, 0);
	}
}

.font-color--white {
	color: tokens.$n-0;
}

.font-color--black {
	color: tokens.$n-900;
}
</style>
