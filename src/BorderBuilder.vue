<template>
	<b-table
		:items="items"
		:fields="fields"
	>
		<template #cell(example)="row">
			<div :class="borderRadiusClass(row.index)" />
		</template>
	</b-table>
</template>

<script>
export default {
	data() {
		return {
			fields: [
				{
					key: 'token',
					label: 'Token',
				},
				{
					key: 'value',
					label: 'Valor',
				},
				{
					key: 'example',
					label: 'Exemplo',
				},
			],
			borderVariables: [
				'$border-radius-botao',
				'$border-radius-extra-pequeno',
				'$border-radius-pequeno',
				'$border-radius-normal',
				'$border-radius-grande',
				'$border-radius-extra-grande',
				'$border-radius-circulo',
			],
		};
	},

	methods: {
		borderRadiusClass(index) {
			return this.borderVariables[index].replace('$border-radius-', '');
		}
	},

	computed: {
		items() {
			const factors = [1, 2, 3, 4, 5, 6];
			let items = [];
			for (let n = 0; n < 7; n++) {
				items.push({
					token: this.borderVariables[n],
					value: n < 6 ? `${4 * factors[n]}px` : '50%',
				});
			}

			return items;
		},
	}
};
</script>

<style lang="scss" scoped>
@import './assets/sass/app.scss';

@each $border-radius-name, $border-radius-token in $border-radius {
	.#{$border-radius-name} {
		border-radius: $border-radius-token;
		width: 60px;
		height: 60px;
		background-color: $verde-piccolo-base;
	}
}
</style>
