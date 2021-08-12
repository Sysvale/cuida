<template>
	<div
		class="grid"
	>
		<copy-token :target="target" />
		<div
			v-for="color in paleteColors"
			:key="color"
			class="palete"
		>
			<div
				v-for="(shade, index) in shades"
				:key="shade"
				:class='{
					"first-shade": index === 0,
					"last-shade": index === shades.length - 1,
					[`${colorShadeClass(shade, color)}`]: index >= 0,
				}'
				@click="target = `${colorShadeClass(shade, color)}`"
				:id="`${colorShadeClass(shade, color)}`"
			>
				<span
					v-if="index === 0"
					class="colorNames"
					:class="{ 'low-contrast-color-names': index === 0 || index === 1 || index === 2}"
				>
					<span class="mainColorName"> {{ color }} </span>
					<br />
					<span> <copy-icon size="1.1x" class="text-secondary mr-3"></copy-icon> {{ shade }} </span>
				</span>

				<span
					v-else
					class="colorNames"
					:class="{ 'low-contrast-color-names': index === 0 || index === 1 || index === 2}"
				>
					<span> <copy-icon size="1.1x" class="text-secondary mr-3"></copy-icon> {{ shade }} </span>
				</span>
			</div>
		</div>
		<div
			class="palete"
		>
			<div
				v-for="index in 9"
				:key="index"
				:class='{
					"first-shade": index === 1,
					"last-shade": index === 9,
					[`${colorShadeClass(index)}`]: index >= 1,
				}'
			>
				<span
					v-if="index === 1"
					class="colorNames low-contrast-color-names"
				>
					<span> Escala de cinza </span>
					<br />
					<span> cinza-{{ index }} </span>
				</span>

				<span
					v-else
					class="colorNames"
					:class="{ 'low-contrast-color-names': index >= 1 && index <= 5}"
				>
					cinza-{{ index }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import { CopyIcon } from 'vue-feather-icons'
export default {
	components: {
		CopyIcon,
	},
	data() {
		return {
			target: '',
			paleteColors: [
				'turquesa-perry',
				'piccolo-green',
				'b',
				'roxo-thanos',
				'pantera-cor-de-rosa',
				'vermelho-mario',
				'laranja-naruto',
				'amarelo-pikachu',
			],
			shades: [
				'100',
				'200',
				'300',
				'400',
				'500',
				'600',
				'700',
			],
		};
	},

	methods: {
		colorShadeClass(shade, color = null) {
			if (color) {
				return `${color}-${shade}`;
			}
			return `cinza-${shade}`;
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
			width: 288px;
			height: 72px;
			padding: 14px 20px;
			transform: scale(1);
			transition: all .25s ease-in-out;
			cursor: pointer;
		}

		.#{$colorName}-#{$shadeName}:hover {
			box-shadow: 0 2px 4px #00000014, 0 12px 20px #0000001f;
			transform: scale(1.04);
			z-index: 2;
			transition: all .25s ease-in-out;
		}
	}
}

@each $shadeName, $shade in $cinzas {
	.cinza-#{$shadeName} {
		background-color: $shade;
		width: 250px;
		height: 50px;
		padding: 14px 20px;
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
	text-transform: capitalize;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: -webkit-fill-available;
	font-weight: 500;
}

.mainColorName {
	color: rgb(17, 16, 16);
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
	color: $cinza-9 !important;
}
</style>
