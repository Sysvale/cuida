<template>
	<div>
		<copy-token
			:target="target"
			:value="target"
		/>

		<CdsTable
			:items="items"
			:fields="fields"
			hover
		>
			<template #table-item="{ data, field, rowIndex }">
				<div
					v-if="field === 'token'"
					:id="data.token"
					class="copy-clip"
					@click="target = data.token"
				>
					<CdsIcon
						height="20"
						width="20"
						name="copy-outline"
						class="copy-clip__icon"
					/>

					<div> {{ data.token }} </div>
				</div>

				<div
					v-if="field === 'example'"
				>
					<div :class="borderRadiusClass(rowIndex)" />
				</div>
			</template>
		</CdsTable>
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
	},

	methods: {
		borderRadiusClass(index) {
			return this.borderVariables[index].replace('$border-radius-', '');
		},
	}
};
</script>

<style lang="scss" scoped>
@use './../assets/sass/tokens/index' as tokens;

@each $border-radius-name, $border-radius-token in tokens.$border-radius {
	.#{$border-radius-name} {
		border-radius: $border-radius-token;
		width: 60px;
		height: 60px;
		background-color: tokens.$gp-400;
	}
}

.copy-clip {
	width: fit-content;
	padding: tokens.pYX(2, 3);
	border-radius: 16px;
	border: 1px solid tokens.$n-0;
	transition: all .15s ease-in-out;
	display: flex;
	align-items: center;

	&__icon {
		margin: tokens.mr(3);
		color: tokens.$n-500;
	}
}

.copy-clip:hover {
	border: 1px solid tokens.$gp-300;
	cursor: pointer;
	transition: all .15s ease-in-out;
}
</style>
