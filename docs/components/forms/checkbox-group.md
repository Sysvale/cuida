# CheckboxGroup

### CheckboxGroups são componentes de formulário que permitem seleções binárias e múltiplas.
---
<br>

## Quando usar:
- Quando precisar de um componente de formulário para seleções binárias com várias opções.

<br>

## Quando não usar:
- Quando for preciso que o efeito da interação com o Checkbox seja imediato. Checkboxes devem ser usados sempre em conjunto com um botão de submissão. Para contornar casos como esse, use Switches.


---

## Uso

```js
<CdsCheckboxGroup
	v-model="value"
	label="CheckboxGroup"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsCheckboxGroup"
	:events
/>

---

## Props

<APITable
	name="CdsCheckboxGroup"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsCheckboxGroup"
	section="events"
/>
<br>

<script setup>
	import { ref } from 'vue';
import CdsCheckboxGroup from '@/components/CheckboxGroup.vue';

const events = [
	'update:modelValue',
];

const args = ref({
	label: 'Checkbox Group',
	modelValue: ['test-1'],
	state: 'default',
	options: [
		{
			label: 'Teste 1',
			value: 'test-1',
		},
		{
			label: 'Teste 2',
			value: 'test-2',
		},
		{
			label: 'Teste 3',
			value: 'test-3',
		},
	],
	disabled: false,
	variant: 'green',
});
</script>
