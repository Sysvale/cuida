<template>
	<div>
		<copy-token :target="target" :value="target" />

		<cds-table
			:items="items"
			:fields="fields"
			hover
		>
			<template #table-item="{ data, field, rowIndex }">
				<div
					v-if="field === 'token'"
					@click="target = data.token"
					:id="data.token"
					class="copy-clip"
				>
					<cds-icon
						height="20"
						width="20"
						name="copy-outline"
						class="copy-clip__icon"
					/>

					<div> {{ data.token }} </div>
				</div>

				<div
					v-if="field === 'value'"
				>
					{{ data.value }}
				</div>

				<div
					v-if="field === 'example'"
					:class="shadowClass(rowIndex)"
				/>
			</template>
		</cds-table>
	</div>
</template>

<script>
import CdsIcon from '../components/Icon.vue';
import CdsTable from '../components/Table.vue';
import CopyToken from '../docs-components/CopyToken.vue';

export default {
	components: {
		CdsIcon,
		CopyToken,
		CdsTable,
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
			],
			shadowTokenValues: [
				'0px 4px 8px rgba(16, 24, 64, 0.04);',
				'0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);',
				'0 29.3293px 83.798px -33.5192px rgba(10, 35, 66, 0.3), 0 16.7596px 67.0384px -8.3798px rgba(10, 35, 66, 0.08), 0 27.4195px 21.9356px rgba(10, 35, 66, 0.0417275), 0 14.5623px 11.6498px rgba(10, 35, 66, 0.0503198), 0 6.05969px 4.84775px rgba(10, 35, 66, 0.07);',
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
			for (let n = 0; n < 3; n++) {
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
@import './../assets/sass/tokens.scss';

@each $shadows-name, $shadows-token in $shadows {
	.#{$shadows-name} {
		box-shadow: $shadows-token;
		width: 60px;
		height: 60px;
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
	display: flex;
	align-items: center;

	&__icon {
		margin: mr(3);
		color: $n-500;
	}
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
