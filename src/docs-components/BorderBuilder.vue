<template>
	<div>
		<copy-token :target="target" />

		<b-table
			:items="items"
			:fields="fields"
			class="align-middle"
		>
			<template class="align-middle" #cell(token)="row">
				<div
					@click="target = row.item.token"
					:id="row.item.token"
					class="copy-clip d-flex align-middle align-items-center"
				>
					<copy-icon size="1.1x" class="text-secondary mr-3"></copy-icon>
					<div class="align-middle"> {{ row.item.token }} </div>
				</div>
			</template>

			<template class="align-middle" #cell(example)="row">
				<div class="align-middle" :class="borderRadiusClass(row.index)" />
			</template>
		</b-table>
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
				'$border-radius-button',
				'$border-radius-lil',
				'$border-radius-extra-small',
				'$border-radius-small',
				'$border-radius-medium',
				'$border-radius-large',
				'$border-radius-extra-large',
				'$border-radius-circle',
			],
		};
	},

	methods: {
		borderRadiusClass(index) {
			return this.borderVariables[index].replace('$border-radius-', '');
		},
	},

	computed: {
		items() {
			const factors = [1, 1.5, 2, 3, 4, 5, 6];
			let items = [];
			for (let n = 0; n < 8; n++) {
				items.push({
					token: this.borderVariables[n],
					value: n < 7 ? `${4 * factors[n]}px` : '50%',
				});
			}

			return items;
		},
	}
};
</script>

<style lang="scss" scoped>
@import './../assets/sass/app.scss';

@each $border-radius-name, $border-radius-token in $border-radius {
	.#{$border-radius-name} {
		border-radius: $border-radius-token;
		width: 60px;
		height: 60px;
		background-color: $gp-400;
	}
}

.copy-clip {
	width: fit-content;
	padding: pYX(2, 3);
	border-radius: 16px;
	border: 1px solid $n-0;
	transition: all .15s ease-in-out;
}

.copy-clip:hover {
	border: 1px solid $gp-300;
	cursor: pointer;
	transition: all .15s ease-in-out;
}
</style>
