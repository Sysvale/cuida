<!-- eslint-disable vue/html-quotes -->
<template>
	<div>
		<div
			class="grid"
		>
			<copy-token
				:target="target"
				:value="copyVal"
			/>

			<div
				v-for="(color, idx) in palete"
				:key="idx"
				class="color-swatch"
			>
				<div
					v-for="(shade, index) in color.colorData"
					:id="shade['token']"
					:key="shade['token']"
					:class='{
						"first-shade": index === 0,
						"last-shade": index === color.colorTokens.length - 1,
						[`color-swatch--${shade.token.replace("$", "")}`]: index >= 0,
					}'
					@click="handleClick(shade.token, shade[hexTokenArray[idx]])"
				>
					<span
						v-if="index === 0"
						class="colorNames"
					>
						<div class="colornameContainer">
							<span
								class="mainColorName"
								:class="fontColorResolver(shade.shade)"
							>
								{{ color.colorName }}
							</span>
	
							<div
								:id="`${shade['token']}-pop`"
								class="d-flex align-items-center"
								@click.stop="handlePop(shade['token'], idx)"
							>								
								<cds-icon
									height="18"
									width="18"
									name="unfold-vertical-outline"
									:class="ContrastChecker(shade.shade, '#FFFFFF', 'POOR') ? 'white' : 'black'"
								/>

								<div
									class="fancyType"
									:class="fontColorResolver(shade.shade)"
								>
									{{ hexTokenArray[idx] === 'shade' ? 'HEX' : 'Token' }}
								</div>
							</div>
						</div>
						<br>
						<span class="color-token__container">
							
							<cds-icon
								height="20"
								width="20"
								name="copy-outline"
								class="copy-icon"
								:class="fontColorResolver(shade.shade)"
							/>
	
							<div :class="fontColorResolver(shade.shade)">
								{{ shade[hexTokenArray[idx]] }}
							</div>
						</span>
					</span>
	
					<span
						v-else
						class="colorNames"
					>
						<span class="color-token__container">
							<cds-icon
								height="20"
								width="20"
								name="copy-outline"
								class="copy-icon"
								:class="fontColorResolver(shade.shade)"
							/>
	
							<div :class="fontColorResolver(shade.shade)">
								{{ shade[hexTokenArray[idx]] }}
							</div>
						</span>
					</span>
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
					class="copy-icon"
				/>

				linear-gradient($bg-gradient)
			</div>
		</div>
	</div>
</template>

<script>
import CdsIcon from '../components/Icon.vue';
import CopyToken from '../docs-components/CopyToken.vue';
import sassColorVariables from '../assets/sass/colors.module.scss';
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
			showPopover: false,
			popoverTargetId: '$gp-50-pop',
			copyVal: '',
			hexTokenArray: [],
			currentIndex: 0,
			sassColorVariables,
		};
	},

	computed: {
		palete() {
			return this.paleteBuilder(this.sassColorVariables.palete);
		}
	},

	mounted() {
		this.hexTokenArray = this.palete.map(() => {
			return 'token';
		});
	},

	methods: {
		paleteBuilder,
		ContrastChecker,

		handleTypeClick(type) {
			if (type === 'token') {
				this.hexTokenArray[this.currentIndex] = 'token';
			} else {
				this.hexTokenArray[this.currentIndex] = 'shade';
			}

			this.showPopover = false;
		},

		handleClick(target, val) {
			this.copyVal = val;
			this.target = target;
		},

		handlePop(shade, index) {
			this.hexTokenArray[index] = this.hexTokenArray[index] === 'token' ? 'shade' : 'token';
			this.currentIndex = index;
		},

		fontColorResolver(shade) {
			return ContrastChecker(shade, '#FFFFFF', 'POOR') ? 'white' : 'black';
		},

		selectHandle(type) {
			let selectClass = '';

			if ((this.hexTokenArray[this.currentIndex] === 'shade') && type === 'HEX') {
				selectClass ='blue';
			}

			if ((this.hexTokenArray[this.currentIndex] === 'token') && type === 'Token') {
				return 'blue';
			}

			return selectClass;
		},

		handleToggle() {

		},
	},
};
</script>

<style lang="scss" scoped>
@import './../assets/sass/tokens.scss';

.grid {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	row-gap: 50px;
}

.last-shade {
	border-radius: 0px 0px 16px 16px;
}

.color-swatch {
	width: max-content;
	border-radius: 16px;

	@include paleteResolver using ($color) {
		background-color: $color;
		width: 320px;
		height: 72px;
		padding: pYX(4, 5);
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

.colorNames {
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: -webkit-fill-available;
	font-weight: 500;
	color: $n-900 !important;
}

.mainColorName {
	text-transform: capitalize;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: -webkit-fill-available;
	font-weight: 700;
	color: $n-800;
}

.first-shade {
	border-radius: 16px 16px 0px 0px;
	height: 100px;
}

.gradient-container {
	font-weight: 500;
	background: linear-gradient($bg-gradient);
	height: 388px;
	width: 94%;
	border-radius: $border-radius-medium;
	outline: 1px solid $n-20;
	display: flex;
	align-items: flex-end;
	justify-content: end;
	padding: pa(4);
	cursor: pointer;
	transform: scale(1);
	transition: all .25s ease-in-out;
}

.gradient-container:hover {
	box-shadow: 0 2px 4px #00000014, 0 12px 20px #0000001f;
	transform: scale(1.04);
	z-index: 2;
	transition: all .25s ease-in-out;
}

.gradient-container__title {
	margin: mTRBL(10, 0, 3, 0);
}

.color-token__container {
	display: flex;
	align-items: center;
}

.copy-icon {
	margin: mr(3);
}

.colornameContainer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: $n-900 !important;
}

.fancyType {
	margin: ml(1);
	min-width: 42px;
}

.white {
	color: $n-0;
}

.black {
	color: $n-900;
}

.blue {
	color: $bn-500;
}
</style>
