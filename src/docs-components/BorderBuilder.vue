<template>
	<div>
		<tooltip :show="showTooltip" :target='target' @hide="showTooltip = false">
			<span> ✅ Token copiado!</span>
		</tooltip>

		<b-table
			:items="items"
			:fields="fields"
			class="align-middle"
		>
			<template class="align-middle" #cell(token)="row">
				<div
					@click="copyToken(row.item.token)"
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
			showTooltip: false,
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
		},

		copyToken(token) {
			this.target = token;
			this.showTooltip = true;

			const el = document.createElement('textarea');

			el.value = token;
			el.setAttribute('readonly', '');
			el.style.position = 'absolute';
			el.style.left = '-9999px';
			document.body.appendChild(el);
			const selected = document.getSelection().rangeCount > 0
				? document.getSelection().getRangeAt(0)
				: false;
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			if (selected) {
				document.getSelection().removeAllRanges();
				document.getSelection().addRange(selected);
			}
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
@import './../assets/sass/app.scss';

@each $border-radius-name, $border-radius-token in $border-radius {
	.#{$border-radius-name} {
		border-radius: $border-radius-token;
		width: 60px;
		height: 60px;
		background-color: $verde-piccolo-base;
	}
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
