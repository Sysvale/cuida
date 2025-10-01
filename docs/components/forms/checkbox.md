# Checkbox

Checkboxes são componentes de formulário que permitem seleções binárias e múltiplas.

---


## Quando usar:
- Quando precisar de um componente de formulário para seleções binárias.

<br>

## Quando não usar:
- Não use checkboxes sem labels.
- Evite labels negativas, elas são mais difíceis de interpretar.
- Quando for preciso que o efeito da interação com o Checkbox seja imediato. Checkboxes devem ser usados sempre em conjunto com um botão de submissão. Para contornar casos como esse, use Switches.
- Evite utilizar checkboxes alinhadas horizontalmente.

---

## Uso

```js
<CdsCheckbox
	v-model="value"
	label="checkbox"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsCheckbox"
	:events
/>

---

## Props

<APITable
	name="CdsCheckbox"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsCheckbox"
	section="events"
/>

---

<script setup>
import { ref } from 'vue';
import CdsCheckbox from '@/components/Checkbox.vue';

const events = [
	'update:modelValue',
	'update:indeterminate'
];

const args = ref({
	label: 'Checkbox',
	modelValue: false,
	indeterminate: false,
	disabled: false,
	prominent: false,
	variant: 'green',
});
</script>
