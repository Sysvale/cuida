<template>
	<div class="d-flex align-items-center justify-content-center mr-5">
		<copy-token :target="target" />

		<div>
			<label for="spacing_type">Espaçamento:</label>
			<br>

			<div>
				<input type="checkbox" id="spacing_padding" v-model="spacing_padding">
				<label for="scales">Padding</label>
			</div>

			<div>
				<input type="checkbox" id="spacing_margin" v-model="spacing_margin">
				<label for="horns">Margin</label>
			</div>

			<br>
			<br>
			<label for="direction">Direção:</label>
			<br>
			<select id="direction" v-model="direction">
				<option value="t">Top</option>
				<option value="r">Right</option>
				<option value="b">Bottom</option>
				<option value="l">Left</option>
				<option value="y">Vertical</option>
				<option value="x">Horizontal</option>
				<option value="a">All</option>
			</select>

			<br>
			<br>
			<label for="size">Tamanho:</label>
			<br>
			<select id="size" v-model="size">
				<option value="0">0</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
			</select>
		</div>
		<div class="sqrp ml-5">
			<div
				class="sqr pa"
				:style="syledStyles"
			>
				<div
					class="sqrw"
				>
					<div
						@click="target = 'spac'"
						id="spac"
						class="copy-clip d-flex align-middle align-items-center"
					>
						<copy-icon size="1.1x" class="text-secondary mr-3"></copy-icon>
						{{ `${spacing}${direction}(${size})` }}
					</div>
				</div>
			</div>
		</div>
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
			direction: 'a',
			spacing: 'p',
			size: '0',
			spacing_padding: false,
			spacing_margin: false,
			spacers: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3],
		};
	},
	computed: {
		syledStyles() {
			let pad;
			let marg;

			if (this.spacing_padding) {
				switch (this.direction) {
					case 't':
						pad = `${this.spacers[this.size] * 16}px 0px 0px 0px`;
						break;
					case 'r':
						pad = `0px ${this.spacers[this.size] * 16}px 0px 0px`;
						break;
					case 'b':
						pad = `0px 0px ${this.spacers[this.size] * 16}px 0px`;
						break;
					case 'l':
						pad = `0px 0px 0px ${this.spacers[this.size] * 16}px`;
						break;
					case 'y':
						pad = `${this.spacers[this.size] * 16}px 0px`;
						break;
					case 'x':
						pad = `0px ${this.spacers[this.size] * 16}px`;
						break;
					case 'a':
						pad = `${this.spacers[this.size] * 16}px`;
						break;
					default:
						pad = `${this.spacers[this.size] * 16}px`;
						break;
				}
			}

			if (this.spacing_margin) {
				switch (this.direction) {
					case 't':
						marg = `${this.spacers[this.size] * 16}px 0px 0px 0px`;
						break;
					case 'r':
						marg = `0px ${this.spacers[this.size] * 16}px 0px 0px`;
						break;
					case 'b':
						marg = `0px 0px ${this.spacers[this.size] * 16}px 0px`;
						break;
					case 'l':
						marg = `0px 0px 0px ${this.spacers[this.size] * 16}px`;
						break;
					case 'y':
						marg = `${this.spacers[this.size] * 16}px 0px`;
						break;
					case 'x':
						marg = `0px ${this.spacers[this.size] * 16}px`;
						break;
					case 'a':
						marg = `${this.spacers[this.size] * 16}px`;
						break;
					default:
						marg = `${this.spacers[this.size] * 16}px`;
						break;
				}
			}

			return {
				'--padding': pad,
				'--margin': marg,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import './../assets/sass/app.scss';

.opa{
	background-color: rgb(139, 145, 190);
	padding: pt(3);
	width: min-content;
	margin: mt-n(0);
}

.grid {
	display: flex;
	flex-direction: row;
	justify-content: center;

	&__table-row {
		display: flex;
		margin: ml(3);
	}
	&__space-card {
		display: flex;
		background-color: $turquesa-perry-light-1;
		color: $turquesa-perry-dark-2;
		margin: mx(2);
	}
}

.sqrp {
	background-color: cadetblue;
	border-radius: $border-radius-pequeno;
}

.sqr {
	background-color: aquamarine;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: $border-radius-pequeno;
}

.pa {
	margin: var(--margin);
	padding: var(--padding);
}

.sqrw {
	background-color: $cinza-3;
	padding: 16px;
	border-radius: $border-radius-pequeno;
}

.copy-clip {
    width: fit-content;
    padding: 8px 12px;
    border-radius: 16px;
	border: 1px solid $branco;
	transition: all .15s ease-in-out;
}

.copy-clip:hover {
	// background-color: #EDFDF5;
	border: 1px solid $verde-piccolo-light-1;
	cursor: pointer;
	transition: all .15s ease-in-out;
}
</style>
