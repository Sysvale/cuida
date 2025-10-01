# DataTable

### O DataTable é um wrapper da tabela base, que adiciona funcionalidades de usabilidade e personalização para visualização e interação com dados tabulares.
---
<br>

## Quando usar:
- Quando for necessário exibir dados em formato tabular com funcionalidades extras como personalização de colunas, exibição da contagem total de registros e ações complementares (ex: exportações);
- Quando o contexto exigir uma interface para manipulação e leitura de dados, como painéis administrativos, relatórios dinâmicos ou listas interativas;
- Quando o desenvolvedor quiser aproveitar a API da tabela base mas com uma estrutura visual e funcional mais completa e pronta para uso.

<br>

## Quando não usar:
- Quando a tabela base já atende completamente às necessidades da interface, sem necessidade de contagem de registros, personalização ou ações adicionais;
- Quando o controle total sobre o layout da tabela for necessário e o uso de slots for inadequado ao contexto visual.

<br>

## Obs.:
- O **DataTable** utiliza internamente o componente **_table_**. Isso significa que todas as _props_ aceitas pela tabela original e todos os eventos emitidos por ela também são aceitos e emitidos pelo **DataTable**, garantindo total compatibilidade com a **API** da tabela base.


---

## Uso

```js
<CdsDataTable
	:fields="fields"
	:items="items"
	:totalItems="100"
/>
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsDataTable"
	:events
	with-background
/>

---

## Props

<APITable
	name="CdsDataTable"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsDataTable"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsDataTable"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsDataTable from '@/components/DataTable.vue';

const fields = ref([
	{
		key: 'nome',
		label: 'Nome',
	},
	{
		key: 'sobrenome',
		label: 'Sobrenome',
	},
	{
		key: 'idade',
		label: 'Idade',
	},
	{
		key: 'cpf',
		label: 'CPF',
	},
	{
		key: 'rg',
		label: 'RG',
	},
	{
		key: 'endereco',
		label: 'Endereço',
	}
]);

const items = ref([
	{
		nome: 'João Marcelo',
		sobrenome: 'Freitas',
		idade: 30,
		cpf: '123.456.789-00',
		rg: '12.345.678-9',
		endereco: 'Rua 1, 123 - Bairro 1',
	},
	{
		nome: 'Maria Clara',
		sobrenome: 'Silva',
		idade: 25,
		cpf: '987.654.321-00',
		rg: '98.765.432-1',
		endereco: 'Rua 2, 456 - Bairro 2',
	},
	{
		nome: 'Pedro Henrique',
		sobrenome: 'Santos',
		idade: 45,
		cpf: '456.789.123-00',
		rg: '45.678.912-3',
		endereco: 'Rua 3, 789 - Bairro 3',
	},
	{
		nome: 'Ana Beatriz',
		sobrenome: 'Oliveira',
		idade: 28,
		cpf: '789.123.456-00',
		rg: '78.912.345-6',
		endereco: 'Rua 4, 321 - Bairro 4',
	},
	{
		nome: 'Lucas Gabriel',
		sobrenome: 'Ferreira',
		idade: 33,
		cpf: '321.654.987-00',
		rg: '32.165.498-7',
		endereco: 'Rua 5, 654 - Bairro 5',
	},
	{
		nome: 'Julia Sophia',
		sobrenome: 'Rodrigues',
		idade: 29,
		cpf: '654.987.321-00',
		rg: '65.498.732-1',
		endereco: 'Rua 6, 987 - Bairro 6',
	},
	{
		nome: 'Rafael Miguel',
		sobrenome: 'Costa',
		idade: 37,
		cpf: '147.258.369-00',
		rg: '14.725.836-9',
		endereco: 'Rua 7, 147 - Bairro 7',
	},
	{
		nome: 'Isabella Laura',
		sobrenome: 'Almeida',
		idade: 31,
		cpf: '258.369.147-00',
		rg: '25.836.914-7',
		endereco: 'Rua 8, 258 - Bairro 8',
	},
	{
		nome: 'Matheus Felipe',
		sobrenome: 'Pereira',
		idade: 42,
		cpf: '369.147.258-00',
		rg: '36.914.725-8',
		endereco: 'Rua 9, 369 - Bairro 9',
	},
	{
		nome: 'Valentina Alice',
		sobrenome: 'Carvalho',
		idade: 27,
		cpf: '741.852.963-00',
		rg: '74.185.296-3',
		endereco: 'Rua 10, 741 - Bairro 10',
	}
]);

const customFields = ref([
	{
		label: 'Nome',
		id: 'nome',
		visible: true,
	},
	{
		label: 'Sobrenome',
		id: 'sobrenome',
		visible: true,
	},
	{
		label: 'Idade',
		id: 'idade',
		visible: true,
	},
	{
		label: 'CPF',
		id: 'cpf',
		visible: true,
	},
	{
		label: 'RG',
		id: 'rg',
		visible: true,
	},
	{
		label: 'Endereço',
		id: 'endereco',
		visible: true,
	}
]);

const presetsOptions = ref([
	{
		label: 'Basicão',
		columns: ['nome', 'sobrenome', 'idade']
	},
	{
		label: 'Pessoal',
		columns: ['nome', 'idade', 'cpf']
	},
	{
		label: 'Endereço',
		columns: ['nome', 'endereco']
	},
	{
		label: 'Documentos',
		columns: ['nome', 'sobrenome', 'cpf', 'rg']
	},
	{
		label: 'X-Tudo',
		columns: ['nome', 'sobrenome', 'idade', 'cpf', 'rg', 'endereco']
	}
]);

const events = [
	'update:modelValue',
	'update-fields-list',
	'customize-click',
	'search',
	'search-button-click',
];

const args = ref({
	fields: fields,
	items,
	fixedHeader: true,
	allowSelection: false,
	selectionVariant: 'green',
	totalItems: 100,
	presetsOptions: presetsOptions,
	customFieldsList: customFields,
	customFieldsSearchable: true,
	minVisibleFields: 1,
	maxVisibleFields: 0,
	fixedHeader: false,
	noWrap: true,
});
</script>
