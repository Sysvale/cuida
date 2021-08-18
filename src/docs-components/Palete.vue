<template>
	<div
		class="grid"
	>
		<copy-token :target="target" />
		<div
			v-for="p in pal"
			:key="p"
			class="palete"
		>
			<div
				v-for="(shade, index) in p.tokens"
				:key="shade"
				:class='{
					"first-shade": index === 0,
					"last-shade": index === p.tokens.length - 1,
					[`${colorShadeClass(test(shade), p.color)}`]: index >= 0,
				}'
				@click="target = shade"
				:id="shade"
			>
				<span
					v-if="index === 0"
					class="colorNames"
					:class="{ 'low-contrast-color-names': index === 0 || index === 1 || index === 2 || index === 3}"
				>
					<span class="mainColorName"> {{ p.color }} </span>
					<br />
					<span>
						<copy-icon size="1.1x" class="text-secondary mr-3" :class="{ 'low-contrast-color-names': index === 0 || index === 1 || index === 2 || index === 3}" />
						{{ shade }}
					</span>
				</span>

				<span
					v-else
					class="colorNames"
					:class="{ 'low-contrast-color-names': index === 0 || index === 1 || index === 2}"
				>
					<span>
						<copy-icon size="1.1x" class="mr-3" :class="{ 'low-contrast-color-names': index === 0 || index === 1 || index === 2 || index === 3}" />
						{{ shade }}
					</span>
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
			pal: [
				{
					color: 'Piccolo',
					tokens: [
						'g-100',
						'g-200',
						'g-300',
						'g-400',
						'g-500',
						'g-600',
						'g-700',
					],
				},
				{
					color: 'Sulivan',
					tokens: [
						't-100',
						't-200',
						't-300',
						't-400',
						't-500',
						't-600',
						't-700',
					],
				},
				{
					color: 'Nocturne',
					tokens: [
						'b-100',
						'b-200',
						'b-300',
						'b-400',
						'b-500',
						'b-600',
						'b-700',
					],
				},
				{
					color: 'Sonic',
					tokens: [
						'i-100',
						'i-200',
						'i-300',
						'i-400',
						'i-500',
						'i-600',
						'i-700',
					],
				},
				{
					color: 'Raven',
					tokens: [
						'v-100',
						'v-200',
						'v-300',
						'v-400',
						'v-500',
						'v-600',
						'v-700',
					],
				},
				{
					color: 'Boo',
					tokens: [
						'p-100',
						'p-200',
						'p-300',
						'p-400',
						'p-500',
						'p-600',
						'p-700',
					],
				},
				{
					color: 'Carmen',
					tokens: [
						'r-100',
						'r-200',
						'r-300',
						'r-400',
						'r-500',
						'r-600',
						'r-700',
					],
				},
				{
					color: 'Goku',
					tokens: [
						'o-100',
						'o-200',
						'o-300',
						'o-400',
						'o-500',
						'o-600',
						'o-700',
					],
				},
				{
					color: 'Lisa',
					tokens: [
						'a-100',
						'a-200',
						'a-300',
						'a-400',
						'a-500',
						'a-600',
						'a-700',
					],
				},
				{
					color: 'Light Neutrals',
					tokens: [
						'n-0',
						'n-10',
						'n-20',
						'n-30',
						'n-40',
					],
				},
				{
					color: 'Mid Neutrals',
					tokens: [
						'n-50',
						'n-100',
						'n-200',
						'n-300',
						'n-400',
					],
				},
				{
					color: 'Dark Neutrals',
					tokens: [
						'n-500',
						'n-600',
						'n-700',
						'n-800',
						'n-900',
					],
				},
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

		test(sh) {
			return sh.replace(/\D-/, "");
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
			border-radius: 4px;
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
