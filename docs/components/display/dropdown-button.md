# DropdownButtons

### DropdownButtons são componentes utilizados para ativar popovers contendo listas de ações.
---
<br>

## Quando usar:
- Quando precisar agrupar ações sob um mesmo contexto.

<br>

## Quando não usar:
- Em substituição à um Multiselect ou Select.
- Para exibir filtros
- Com mais de 5 ações

---

## Uso

```js
<CdsDropdownButton
	text="Finalizar solicitação"
	:items
	size="md"
	variant="green"
	:secondary=true
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsDropdownButton"
	:events
/>

---

## Props

<APITable
	name="DropdownButton"
	section="props"
/>
<br>

## Eventos

<APITable
	name="DropdownButton"
	section="events"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsDropdownButton from '@/components/DropdownButton.vue';

const events = [
	'click',
	'action-click'
];

const items = ref([
	{
		name: 'Cancelar solicitação',
		icon: 'block-outline',
	},
	{
		name: 'Indeferir solicitação',
		icon: 'alert-outline',
	},
	{
		name: 'Deferir solicitação',
		icon: 'check-outline',
	},
]);

const args = ref({
	text: 'Finalizar solicitação',
	items: items,
	size: 'md',
	variant: 'green',
	secondary: true,
});
</script>
