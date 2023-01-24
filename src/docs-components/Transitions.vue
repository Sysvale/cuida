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

	methods: {
		transitionClass(index) {
			return this.transitionVariables[index].replace('$', '');
		},
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
	}
};
</script>

<style lang="scss" scoped>
@import './../assets/sass/tokens.scss';

.ball1 {
	width: 24px;
	height: 24px;
	background-color: $gp-400;
	outline: 1px solid $n-0;
	border-radius: $border-radius-circle;
}

.ball2 {
	width: 24px;
	height: 24px;
	background-color: $n-0;
	outline: 1px solid $n-200;
	border-radius: $border-radius-circle;
}

.ball-container {
	display: flex;
	width: 100%;
	justify-content: space-between;
}

@each $transitions-name, $transitions-token in $transition {
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
		background-color: $n-0;
		outline: 1px solid $n-200;
	}

	.#{$transitions-name}:hover > .ball-container > .ball2 {
		background-color: $gp-400;
		outline: 1px solid $n-0;
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

.line {
	width: 100%;
	height: 1px;
	background-color: $n-200;
	margin: mt(1);
}

// @keyframes slide {
// 	from {
// 		transform:translateX(0)
// 	}

// 	to {
// 		transform:translateX(100px);
// 	}
// }
</style>
