<template>
	<div class="playground">
		<copy-token
			:target="target"
			:value="target"
		/>

		<div>
			<label
				for="spacing_type"
				class="playground__field-label"
			>
				Espaçamento:
			</label>
			<br>

			<div>
				<input
					id="padding"
					v-model="picked_spacer"
					type="radio"
					value="Padding"
				>
				<label for="padding">Padding</label>
			</div>

			<div>
				<input
					id="margin"
					v-model="picked_spacer"
					type="radio"
					value="Margin"
				>
				<label for="margin">Margin</label>
			</div>

			<br>

			<label
				for="direction"
				class="playground__field-label"
			>
				Direção:
			</label>
			<br>
			<select
				id="direction"
				v-model="direction"
			>
				<option value="t">
					Top
				</option>
				<option value="r">
					Right
				</option>
				<option value="b">
					Bottom
				</option>
				<option value="l">
					Left
				</option>
				<option value="y">
					Vertical
				</option>
				<option value="x">
					Horizontal
				</option>
				<option value="a">
					All
				</option>
			</select>

			<br>
			<br>
			<label
				for="size"
				class="playground__field-label"
			>
				Tamanho:
			</label>
			<br>
			<select
				id="size"
				v-model="size"
			>
				<option
					v-for="option in optionsList"
					:key="option"
					:value="option"
				>
					{{ option }}
				</option>
			</select>
		</div>

		<div class="playground__demo-element">
			<div
				class="demo-element__outer-container"
				:style="spacingStyles"
			>
				<div
					class="demo-element__inner-container"
				>
					<div
						:id="`${spacer}${direction}(${size})`"
						class="inner-container__token-text"
						@click="target = `${spacer}${direction}(${size})`"
					>
						<cds-icon
							height="20"
							width="20"
							name="copy-outline"
							class="inner-container__icon"
						/>

						{{ `${spacer}${direction}(${size})` }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CdsIcon from '../components/Icon.vue';
import CopyToken from '../docs-components/CopyToken.vue';

export default {
	components: {
		CdsIcon,
		CopyToken,
	},

	data() {
		return {
			target: '',
			direction: 'a',
			size: '0',
			picked_spacer: 'Padding',
			spacers: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3],
		};
	},

	computed: {
		spacingStyles() {
			let padding;
			let margin;

			if (this.picked_spacer === 'Padding') {
				switch (this.direction) {
					case 't':
						padding = `${this.spacers[this.size] * 16}px 0px 0px 0px`;
						break;
					case 'r':
						padding = `0px ${this.spacers[this.size] * 16}px 0px 0px`;
						break;
					case 'b':
						padding = `0px 0px ${this.spacers[this.size] * 16}px 0px`;
						break;
					case 'l':
						padding = `0px 0px 0px ${this.spacers[this.size] * 16}px`;
						break;
					case 'y':
						padding = `${this.spacers[this.size] * 16}px 0px`;
						break;
					case 'x':
						padding = `0px ${this.spacers[this.size] * 16}px`;
						break;
					case 'a':
						padding = `${this.spacers[this.size] * 16}px`;
						break;
					default:
						padding = `${this.spacers[this.size] * 16}px`;
						break;
				}
			}

			else {
				let val = this.size.includes('n') ? -this.spacers[this.size.slice(1)] : this.spacers[this.size];

				switch (this.direction) {
					case 't':
						margin = `${val * 16}px 0px 0px 0px`;
						break;
					case 'r':
						margin = `0px ${val * 16}px 0px 0px`;
						break;
					case 'b':
						margin = `0px 0px ${val * 16}px 0px`;
						break;
					case 'l':
						margin = `0px 0px 0px ${val * 16}px`;
						break;
					case 'y':
						margin = `${val * 16}px 0px`;
						break;
					case 'x':
						margin = `0px ${val * 16}px`;
						break;
					case 'a':
						margin = `${val * 16}px`;
						break;
					default:
						margin = `${val * 16}px`;
						break;
				}
			}

			return {
				'--padding': padding,
				'--margin': margin,
			};
		},

		spacer() {
			if (this.picked_spacer === 'Padding') {
				return 'p';
			}

			return 'm';
		},

		optionsList() {
			let options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

			if (this.picked_spacer === 'Padding') {
				return options;
			}

			return [...options, 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10', 'n11', 'n12'];
		}
	},
};
</script>

<style lang="scss" scoped>
@import './../assets/sass/tokens.scss';

.playground {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 50%;

	&__field-label {
		font-weight: 500;
	}

	&__demo-element {
		background-color: $og-200;
		border-radius: $border-radius-small;
	}
}

.demo-element {
	&__outer-container {
		background-color: $gp-200;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $n-600;
		border-radius: $border-radius-small;

		margin: var(--margin);
		padding: var(--padding);
	}

	&__inner-container {
		background-color: $n-0;
		padding: pYX(8, 4);
		border-radius: $border-radius-small;
		box-shadow: #2544811f 0px 0px 16px 0px;
		background-color: $n-0;
	}
}

.inner-container {
	&__token-text {
		display: flex;
		align-items: center;
		width: 120px;
		padding: pYX(2, 3);
		border-radius: 16px;
		border: 1px solid transparent;
		transition: all .15s ease-in-out;

		&:hover {
			border: 1px solid $gp-300;
			cursor: pointer;
			transition: all .15s ease-in-out;
		}
	}

	&__icon {
		margin: mr(3);
		color: $n-500;
	}
}

select {
	width: 100px;
	font-size: 16px;
	line-height: 1;
	border: 0;
	border-radius: 5px;
	height: 34px;
	background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right #fff;
	background-size: 10px 10px;
	-webkit-appearance: none;
	background-position-x: 78px;
	padding: pa(1);
	border-radius: 4px;
	border: 1px solid #ada9a9;
}
</style>
