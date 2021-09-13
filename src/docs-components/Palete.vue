<template>
	<div
		class="grid"
	>
		<copy-token :target="target" />

		<div
			v-for="color in palete"
			:key="color"
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
					<span>
						<copy-icon
							size="1.1x"
							class="mr-3" 
							:class="{ 'low-contrast-color-names': isADarkColor(color, index) }"
						/>

						{{ shade }}
					</span>
				</span>

				<span
					v-else
					class="colorNames"
					:class="{ 'low-contrast-color-names': isADarkColor(color, index) }"
				>
					<span>
						<copy-icon
							size="1.1x"
							class="mr-3"
							:class="{ 'low-contrast-color-names': isADarkColor(color, index) }"
						/>

						{{ shade }}
					</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import { CopyIcon } from 'vue-feather-icons'
import { PALETE } from '../utils/constants/paleteConstants.js';

export default {
	components: {
		CopyIcon,
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
@import './../assets/sass/app.scss';

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
</style>
