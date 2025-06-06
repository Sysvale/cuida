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
					class="elevation__example"
				>
					<div
						class="toast"
						:class="rowIndex === 7 ? 'active' : ''"
					/>
					<span
						class="toast-text"
					>
						- toast
					</span>
					<div
						class="el tooltip"
						:class="rowIndex === 6 ? 'active' : ''"
					/>
					<span
						class="tooltip-text"
					>
						- tooltip
					</span>
					<div
						class="el modal"
						:class="rowIndex === 5 ? 'active' : ''"
					/>
					<span
						class="modal-text"
					>
						- modal
					</span>
					<div
						class="el sidesheet"
						:class="rowIndex === 4 ? 'active' : ''"
					/>
					<span
						class="sidesheet-text"
					>
						- sidesheet
					</span>
					<div
						class="el toolbar"
						:class="rowIndex === 3 ? 'active' : ''"
					/>
					<span
						class="toolbar-text"
					>
						- toolbar
					</span>
					<div
						class="el backdrop"
						:class="rowIndex === 2 ? 'active' : ''"
					/>
					<span
						class="backdrop-text"
					>
						- backdrop
					</span>
					<div
						class="el base"
						:class="rowIndex === 1 ? 'active' : ''"
					/>
					<span
						class="base-text"
					>
						- base
					</span>
					<div
						class="el sunk"
						:class="rowIndex === 0 ? 'active' : ''"
					/>
					<span
						class="sunk-text"
					>
						- sunk
					</span>
				</div>
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
			elevationVariables: [
				'$z-index-sunk',
				'$z-index-base',
				'$z-index-backdrop',
				'$z-index-toolbar',
				'$z-index-sidesheet',
				'$z-index-modal',
				'$z-index-tooltip',
				'$z-index-toast',
			],
			elevationTokenValues: [
				'-1000',
				'0',
				'1000',
				'2000',
				'2500',
				'3000',
				'4000',
				'5000',
			],
		};
	},

	computed: {
		items() {
			let items = [];
			for (let n = 0; n < 8; n++) {
				items.push({
					token: this.elevationVariables[n],
					value: this.elevationTokenValues[n],
				});
			}

			return items;
		},
	},

	methods: {
		elevationClass(index) {
			return this.elevationVariables[index].replace('$z-index-', '');
		},
	}
};
</script>

<style lang="scss" scoped>
@use './../assets/sass/tokens/index' as tokens;

@each $elevation-name, $elevation-token in tokens.$z-index {
	.#{$elevation-name} {
		z-index: $elevation-token;
		width: 80px;
		height: 80px;
		outline: 3px dashed tokens.$gp-300;
		border-radius: tokens.$border-radius-small;
		transform: rotateX(72deg) rotateZ(-45deg) scale(1.2);
		transition: all .2s ease-in-out;
	}

	.#{$elevation-name}:hover {
		background-color: rgba(tokens.$gp-200, 0.5);
		transition: all .2s ease-in-out;
	}

	.#{$elevation-name}:hover ~ .#{$elevation-name}-text {
		display: block;
		transition: all .2s ease-in-out;
	}

	@if $elevation-name == 'base' {
		.#{$elevation-name} {
			z-index: 10;
		}
	}

	@if $elevation-name == 'sunk' {
		.#{$elevation-name} {
			z-index: 5;
		}
	}
}

.copy-clip {
	width: fit-content;
	padding: tokens.pYX(2, 3);
	border-radius: 16px;
	border: 1px solid tokens.$n-0;
	transition: all .2s ease-in-out;
	display: flex;
	align-items: center;

	&__icon {
		margin: tokens.mr(3);
		color: tokens.$n-500;
	}
}

.elevation__example {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 28px !important;
}

.copy-clip:hover {
	border: 1px solid tokens.$gp-300;
	cursor: pointer;
	transition: all .2s ease-in-out;
}

.column-width {
	width: 800px !important;
}

.el {
	margin-top: -65px !important;
}

.base {
	background-color: tokens.$n-10;
	outline: 2px dashed tokens.$n-100;
	width: 90px;
	height: 90px;
	margin-left: -4px !important;
}

.active {
	background-color: tokens.$gp-200;
}

.sunk-text,
.backdrop-text,
.toolbar-text,
.sidesheet-text,
.modal-text,
.tooltip-text,
.toast-text {
	display: none;
	transition: all .2s ease-in-out;
}

.sunk-text {
	position: absolute;
	margin-top: 102px !important;
	margin-left: 122px !important;
	color: tokens.$n-600;
}

.base-text {
	position: absolute;
	margin-top: 52px !important;
	margin-left: 122px !important;
	color: tokens.$n-600;
}

.backdrop-text {
	position: absolute;
	margin-top: 2px !important;
	margin-left: 122px !important;
	color: tokens.$n-600;
}

.toolbar-text {
	position: absolute;
	margin-top: -12px !important;
	margin-left: 122px !important;
	color: tokens.$n-600;
}

.sidesheet-text {
	position: absolute;
	margin-top: -22px !important;
	margin-left: 122px !important;
	color: tokens.$n-600;
}

.modal-text {
	position: absolute;
	margin-top: -42px !important;
	margin-left: 122px !important;
	color: tokens.$n-600;
}

.tooltip-text {
	position: absolute;
	margin-top: -72px !important;
	margin-left: 122px !important;
	color: tokens.$n-600;
}

.toast-text {
	position: absolute;
	margin-top: -102px !important;
	margin-left: 122px !important;
	color: tokens.$n-600;
}

</style>
