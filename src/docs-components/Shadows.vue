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

			<template class="align-middle" #cell(value)="row">
				<div class="align-middle column-width"> {{ row.item.value }} </div>
			</template>

			<template class="align-middle" #cell(example)="row">
				<div class="align-middle" :class="shadowClass(row.index)" />
			</template>
		</b-table>
	</div>
</template>

<script>
import { CopyIcon } from 'vue-feather-icons';

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
			shadowVariables: [
				'$shadow-sm',
				'$shadow-md',
				'$shadow-lg',
				'$shadow-xl',
			],
			shadowTokenValues: [
				'0px 4.1899px 14.6647px -4.1899px rgba(27, 72, 125, 0.75);',
				'0px 4.1899px 25.1394px -4.1899px rgba(42, 78, 172, 0.08), 0px 25.1394px 16.7596px -16.7596px rgba(42, 78, 172, 0.09), 0px 8.3798px 16.7596px -8.3798px rgba(42, 78, 172, 0.07);',
				'0px 4.1899px 25.1394px 4.1899px rgba(53, 119, 198, 0.06), 0px 16.7596px 50.2788px -8.3798px rgba(53, 119, 198, 0.02), 0px 37.7091px 33.5192px -16.7596px rgba(53, 119, 198, 0.08);',
				'0px 29.3293px 83.798px -33.5192px rgba(10, 35, 66, 0.3), 0px 16.7596px 67.0384px -8.3798px rgba(10, 35, 66, 0.08), 0px 27.4195px 21.9356px rgba(10, 35, 66, 0.0417275), 0px 14.5623px 11.6498px rgba(10, 35, 66, 0.0503198), 0px 6.05969px 4.84775px rgba(10, 35, 66, 0.07);',
			],
		};
	},

	methods: {
		shadowClass(index) {
			return this.shadowVariables[index].replace('$shadow-', '');
		},
	},

	computed: {
		items() {
			let items = [];
			for (let n = 0; n < 4; n++) {
				items.push({
					token: this.shadowVariables[n],
					value: this.shadowTokenValues[n],
				});
			}

			return items;
		},
	}
};
</script>

<style lang="scss" scoped>
@import './../assets/sass/app.scss';

@each $shadows-name, $shadows-token in $shadows {
	.#{$shadows-name} {
		box-shadow: $shadows-token;
		width: 100px;
		height: 100px;
		background-color: $n-0;
		border-radius: $border-radius-small;
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

.column-width {
	width: 800px !important;
}
</style>
