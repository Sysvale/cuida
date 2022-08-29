<template>
	<table class="table__container">
		<tr class="table__header">
			<th
				v-for="(field, index) in computedFields"
				:class="resolveHeaderItemClass(index)"
				:key="index"
			>
				<!--
					@slot Slot usado para renderizar itens personalizados para o cabeçalho da tabela.
					Dados do item referente à coluna podem ser acessados através da propriedade `data`.
					Os dados do escopo do slot podem ser acessados no formato a seguir:

					
					slot-scope={ data }
				-->
				<slot
					name="header-item"
					:data="field"
				>
					{{ field.label }}
				</slot>
			</th>
		</tr>
		<tr
			v-for="(item, itemIndex) in items"
			:key="itemIndex"
		>
			<td
				v-for="(field, fieldIndex) in computedFields"
				:class="resolveContentItemClass(itemIndex, fieldIndex)"
				:key="fieldIndex"
			>
				<!--
					@slot Slot usado para renderizar itens personalizados para o conteúdo da tabela.
					Dados do item referente à linha podem ser acessados através da propriedade `data`,
					enquanto a key referente à coluna podem ser acessados através da propriedade `field`.
					Os dados do escopo do slot podem ser acessados no formato a seguir:

					
					slot-scope={ data, field }
				-->
				<slot
					name="table-item"
					:data="item"
					:field="field.key"
				>
					{{ item[field.key] }}
				</slot>
			</td>
		</tr>
	</table>	
</template>

<script>
import { startCase } from 'lodash';

export default {

	props: {
		/**
		 * Array contendo os itens a serem exibidos na tabela. Os itens devem estar no seguinte formato:
		 * 
		 * 
		 * ``{ 'exampleKey1': 'exampleValue1', 'exampleKey2': 'exampleValue2' }`` 
		 * 
		 * Com a 'key' sendo a mesma do campo da tabela onde o valor deve ser exibido
		 */
		items: {
			type: Array,
			required: true,
			default: () => ([]),
		},
		/**
		 * Array contendo os campos serem exibidos no cabeçalho da tabela. Os campos devem estar no seguinte formato:
		 * 
		 * ``{ key: 'exampleKey1', label: 'exampleLabel1' }``
		 * 
		 * Ou em formato de string simples (``'fieldkey'``). Neste caso, o valor exibido no cabeçalho da tabela será a string convertida para [Start Case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
		 */
		fields: {
			type: Array,
			default: () => ([]),
		},
	},

	computed: {
		computedFields() {
			if (this.fields.length > 0) {
				return this.fields.map(field => {
					if (typeof field === 'object') {
						return field;
					}

					return {
						key: field,
						label: startCase(field),
					};
				});
			}

			return this.items.length > 0
				? Object.keys(this.items[0]).map(key =>{
					return {
						key: key,
						label: startCase(key),
					}
				})
				: [];
		},
	},

	methods: {
		resolveHeaderItemClass(index) {
			if (index !== 0 && index !== (this.fields.length - 1)) {
				return 'table__header-item';
			}

			return index === 0 ? 'table__header-item--first' : 'table__header-item--last';
		},

		resolveContentItemClass(itemIndex, index) {
			if (!(itemIndex === this.items.length - 1)) {
				return 'table__item';
			}

			if (index !== 0 && index !== (this.fields.length - 1)) {
				return 'table__item--common';
			}

			return index === 0 ? 'table__item--first' : 'table__item--last';
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.table {
	&__container {
		border: 1px solid $n-30;
		border-collapse: separate;
		border-spacing: 0px;
		border-radius: $border-radius-lil;
		width: 100%;
	}

	&__header {
		background-color: $bn-50;
		border-radius: $border-radius-lil;

		&-item {
			@include body-2;
			font-weight: $font-weight-semibold;
			padding: spacer(3) spacer(5);
			border-bottom: 1px solid $n-30;

			&--first {
				@extend .table__header-item;
				border-top-left-radius: $border-radius-lil;
			}

			&--last {
				@extend .table__header-item;
				border-top-right-radius: $border-radius-lil;
			}
		}
	}

	&__item {
		@include body-2;
		font-size: 14px;
		padding: pa(5);
		max-width: 400px;
		border-bottom: 1px solid $n-30;

		&--first {
			@extend .table__item;
			border-bottom-left-radius: $border-radius-lil;
			border-bottom: none;
		}

		&--common {
			@extend .table__item;
			border-bottom: none;
		}

		&--last {
			@extend .table__item;
			border-bottom-right-radius: $border-radius-lil;
			border-bottom: none;
		}
	}
}

</style>
