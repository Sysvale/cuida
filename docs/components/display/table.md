# Table

### Tables são componentes utilizados para exibir e organizar conteúdo, facilitando a comparação e análise de informações.
---
<br>

## Quando usar:
- Desejar comparar dados.
- For necessário exibir dados de forma tabulada.

<br>

## Quando não usar:
- For necessário interagir/realizar uma ação com o conteúdo apresentado na tabela.

---

## Uso

```js
<CdsTable
	image="static/media/CuidaTempLogo.f4adb1cc.png"
	image-description="Imagem de empty state"
	title="Título do empty state"
	text="Para sair dessa situação de empty state, realize a ação abaixo"
	action-button-text="Adicionar novo recurso"
	@action-button-click="handleClick"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsTable"
	:events
	with-background
/>

---

## Props

<APITable
	name="CdsTable"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsTable"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsTable"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsTable from '@/components/Table.vue';

const fields = [
	{
		key: 'field-1',
		label: 'Field 1',
		formatter: (value) => { return `${value}a`  },
		width: '50%',
	},
	{
		key: 'field2',
		label: 'Field 2',
		width: '20%',
	},
	{
		key: 'field-3',
		label: 'Field 3',
	},
	{
		key: 'field_4',
		label: 'Field 4',
	},
];

const items = [
	{
		'field-1': '2023-10-10',
		'field2': '0',
		'field-3': 0,
		'field_4': 10298726432
	},
	{
		'field-1': '2023-10-10',
		'field2': '1',
		'field-3': 72,
		'field_4': 10298726432
	},
	{
		'field-1': '2023-10-10',
		'field2': 'field 2 content b',
		'field_3': 60,
		'field_4': 10298726432
	},
];

const events = [
	'update:modelValue'
];

const args = ref({
	items,
	fields
});
</script>
