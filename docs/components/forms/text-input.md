# TextInput

TextInputs permitem que os usuários insiram texto em uma interface.

### Quando usar

- Necessitar de um campo de texto para inserir informações.

### Quando não usar

- O dado a ser utilizado no componente for numérico.
- Houver a necessidade de selecionar múltiplos itens.

---

## Uso

```js
<CdsTextInput />
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsTextInput"
	:events="cdsTextInputEvents"
/>

---

## Props

<APITable
	name="TextInput"
	section="props"
/>
<br />

## Eventos

<APITable
	name="TextInput"
	section="events"
/>
<br />

## Slots

<APITable
	name="TextInput"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
const args = ref({});
import CdsTextInput from '@/components/TextInput.vue';

const cdsTextInputEvents = [
	'update:modelValue',
	'click',
	'change',
	'focus',
	'blur',
	'keydown'
];
</script>
