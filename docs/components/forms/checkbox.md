# Checkbox

Checkboxes são componentes de formulário que permitem seleções binárias e múltiplas.

### Quando usar

- Quando precisar de um componente de formulário para seleções binárias.

### Quando não usar

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

<PreviewContainer
	:component="CdsCheckbox"
	:events="cdsCheckboxEvents"
/>

---

## Props

<APITable
	name="Checkbox"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Checkbox"
	section="events"
/>
<br />

## Slots

<APITable
	name="Checkbox"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsCheckbox from '@/components/Checkbox.vue';

const cdsCheckboxEvents = [
	'update:modelValue',
	'update:indeterminate'
];
</script>
