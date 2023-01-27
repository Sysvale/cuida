<template>
	<div>
		<div
			class="grid"
		>
			<copy-token :target="target" :value="target" />
	
			<div
				v-for="color in palete"
				:key="color.name"
				class="palete"
			>
				<div
					v-for="(shade, index) in color.tokens"
					:key="shade"
					:class='{
						"first-shade": index === 0,
						"last-shade": index === color.tokens.length - 1,
						[`${colorShadeClass(shadeNumber(shade), color.name)}`]: index >= 0,
					}'
					@click="target = shade"
					:id="shade"
				>
					<span
						v-if="index === 0"
						class="colorNames"
						:class="{ 'low-contrast-color-names': isADarkColor(color, index) }"
					>
						<span class="mainColorName"> {{ color.name }} </span>
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
						:class="{ 'low-contrast-color-names': isADarkColor(color, index) }"
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
import CopyToken from '../docs-components/CopyToken.vue';
import { PALETE } from '../utils/constants/paleteConstants.js';

export default {
	components: {
		CdsIcon,
		CopyToken,
	},

	data() {
		return {
			target: '',
			palete: PALETE,
		};
	},

	methods: {
		colorShadeClass(shade, color) {
			if (color.includes('Neutrals')) {
				return `${color.replace(/.+ /, "")}-${shade}`;	
			}

			return `${color.replace(" ", "")}-${shade}`;
		},

		shadeNumber(shade) {
			return shade.replace(/(\D)+-/, "");
		},

		isADarkColor(color, index) {
			return !color.isADarkColor && (color.tokens.length <= 5 || ((index <= color.tokens.length / 2)));
		},
	},
};
</script>

<style lang="scss" scoped>
@import './../assets/sass/tokens.scss';

@each $colorName, $color in $palete {
	@each $shadeName, $shade in $color {
		.#{$colorName}-#{$shadeName} {
			background-color: $shade;
			width: 320px;
			height: 72px;
			padding: pYX(4, 5);
			transform: scale(1);
			transition: all .25s ease-in-out;
			cursor: pointer;
			box-sizing: border-box;
		}

		.#{$colorName}-#{$shadeName}:hover {
			box-shadow: 0 2px 4px #00000014, 0 12px 20px #0000001f;
			transform: scale(1.04);
			z-index: 2;
			transition: all .25s ease-in-out;
			border-radius: 4px;
		}
	}
}

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
}

.colorNames {
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: -webkit-fill-available;
	font-weight: 500;
}

.mainColorName {
	text-transform: capitalize;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: -webkit-fill-available;
	font-weight: 700;
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
</style>
