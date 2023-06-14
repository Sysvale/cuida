<template>
	<div>
		<div
			class="grid"
		>
			<copy-token :target="target" :value="target" />

			<div
				v-for="color in aaaa"
				:key="color.colorNames"
				class="palete"
			>
				<div
					v-for="(shade, index) in color.colorTokens"
					:class='{
						"first-shade": index === 0,
						"last-shade": index === color.colorTokens.length - 1,
						[`palete--${shade.replace("$", "")}`]: index >= 0,
					}'
					@click="target = shade"
					:key="shade"
					:id="shade"
				>
					<span
						v-if="index === 0"
						class="colorNames"
					>
						<div class="colornameContainer">
							<span class="mainColorName"> {{ color.colorName }} </span>
	
							<div class="d-flex" :id="`${shade.replace('$', '')}-pop`">
								<cds-chevron />
								Tokem
							</div>
						</div>

						<br />
						<span class="color-token__container">
							
							<cds-icon
								height="20"
								width="20"
								name="copy-outline"
								class="copy-icon"
							/>
	
							{{ shade }}
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
							/>
	
							{{ shade }}
						</span>
					</span>
				</div>
			</div>
		</div>

		<!-- <cds-popover
			v-model="showPopover"
			:target-id="popoverTargetId"
			fitContentWidth
			right-aligned
			vertical-fluid
		>
			<div class="popElement">
				Totem
			</div>
			<div class="popElement popElement2">
				HEX
			</div>
			{{ sassColorVariables.palete }}
		</cds-popover> -->

		<div>
			<h5 class="gradient-container__title"> Gradiente </h5>
			<div
				class="gradient-container"
				id="linear-gradient($bg-gradient)"
				@click="target = 'linear-gradient($bg-gradient)'"
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
import CdsChevron from '../components/Chevron.vue';
import CdsPopover from '../components/Popover.vue';
import CopyToken from '../docs-components/CopyToken.vue';
import sassColorVariables from '../assets/sass/colors.module.scss';
import { PALETE } from '../utils/constants/paleteConstants.js';
import paleteBuilder from '../utils/methods/paleteBuilder.js';

export default {
	components: {
		CdsIcon,
		CopyToken,
		CdsChevron,
		CdsPopover,
	},

	data() {
		return {
			target: '',
			palete2: [],
			showPopover: false,
			popoverTargetId: '$gp-50-pop',
			sassColorVariables,
		};
	},

	mounted() {
		
		// console.log('🚀 -> file: Palete.vue:137 -> this.palete:', this.palete[0].colorShades);

		this.$nextTick().then(() => {
			this.palete2 = this.paleteBuilder(sassColorVariables.palete);
		});
	},

	computed: {
		aaaa() {
			return this.paleteBuilder(this.sassColorVariables.palete);
		}
	},

	methods: {
		paleteBuilder,

		// colorShadeClass(shade, color) {
		// 	if (color.includes('Neutrals')) {
		// 		return `${color.replace(/.+ /, "")}-${shade}`;	
		// 	}

		// 	return `${color.replace(" ", "")}-${shade}`;
		// },

		// shadeNumber(shade) {
		// 	return shade.replace(/(\D)+-/, "");
		// },

		// isADarkColor(color, index) {
		// 	return !color.isADarkColor && (color.tokens.length <= 5 || ((index <= color.tokens.length / 2)));
		// },

		// handlePop(shade) {
		// 	this.popoverTargetId = `${shade}-pop`;
		// 	this.showPopover = !this.showPopover;

		// 	const regexp = /(\[[^\[\]]*\])/g;

		// 	let objj = this.paleteBuilder(sassColorVariables.palete);
		// 	// console.log('🚀 -> file: Palete.vue:161 -> objj:', objj);

		// 	const matches = sassColorVariables.palete.match(regexp);
			
		// 	for (let i = 0; i < matches.length; i++){
		// 		matches[i] = matches[i].replace(/\\/g, 'aaa');
		// 	}

		// 	// console.log('🚀 -> file: Palete.vue:159 -> matches:', matches);
		// },
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

.palete {
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

.low-contrast-color-names {
	color: $n-900 !important;
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

.popElement {
	color: $n-600;
	@include body-2;
	font-weight: $font-weight-semibold;
	cursor: pointer;
}

.popElement:hover {
	color: $n-800;
}

.popElement2 {
	margin: mt(2);
}
</style>
