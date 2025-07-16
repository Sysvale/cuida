<template>
	<div>
		<copy-token
			:target="target"
			:value="target"
		/>

		<cds-table
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
					:class="transitionClass(rowIndex)"
				>
					<div class="ball-container">
						<div class="ball1" />
						<div class="ball2" />
					</div>
					<div class="line" />
				</div>
			</template>
		</cds-table>
	</div>
</template>

<script>
import CdsIcon from '../components/Icon.vue';
import CdsTable from '../components/Table.vue';
import CopyToken from './CopyToken.vue';

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
			transitionVariables: [
				'$interaction',
				'$hover',
				'$opening',
			],
			transitionTokenValues: [
				'all .2s ease',
				'all .3s ease',
				'all .4s ease',
			],
		};
	},

	computed: {
		items() {
			let items = [];
			for (let n = 0; n < 3; n++) {
				items.push({
					token: this.transitionVariables[n],
					value: this.transitionTokenValues[n],
				});
			}

			return items;
		},
	},

	methods: {
		transitionClass(index) {
			return this.transitionVariables[index].replace('$', '');
		},
	}
};
</script>

<style lang="scss" scoped>
@use './../assets/sass/tokens/index' as tokens;

.ball1 {
	width: 24px;
	height: 24px;
	background-color: tokens.$gp-400;
	outline: 1px solid tokens.$n-0;
	border-radius: tokens.$border-radius-circle;
}

.ball2 {
	width: 24px;
	height: 24px;
	background-color: tokens.$n-0;
	outline: 1px solid tokens.$n-200;
	border-radius: tokens.$border-radius-circle;
}

.ball-container {
	display: flex;
	width: 100%;
	justify-content: space-between;
}

@each $transitions-name, $transitions-token in tokens.$transition {
	.#{$transitions-name} {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	.#{$transitions-name} > .ball-container > .ball1 {
		transition: $transitions-token
	}

	.#{$transitions-name} > .ball-container > .ball2 {
		transition: $transitions-token
	}

	.#{$transitions-name}:hover > .ball-container > .ball1 {
		background-color: tokens.$n-0;
		outline: 1px solid tokens.$n-200;
	}

	.#{$transitions-name}:hover > .ball-container > .ball2 {
		background-color: tokens.$gp-400;
		outline: 1px solid tokens.$n-0;
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

.column-width {
	width: 800px !important;
}

.line {
	width: 100%;
	height: 1px;
	background-color: tokens.$n-200;
	margin: tokens.mt(1);
}
</style>
