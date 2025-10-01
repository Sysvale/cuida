# TextInput

### TextInputs permitem que os usuários insiram texto em uma interface
---
<br>

## Quando usar:
- Necessitar de um campo de texto para inserir informações.

<br>

## Quando não usar:
- O dado a ser utilizado no componente for numérico.
- Houver a necessidade de selecionar múltiplos itens.


---

## Uso

```js
<CdsTextInput
	v-model="inputValue"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsTextInput"
	:events
/>

---

## Props

<APITable
	name="CdsTextInput"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsTextInput"
	section="events"
/>
<br>

---

<script setup>
import { ref } from 'vue';
import CdsTextInput from '@/components/TextInput.vue';

const events = [
	'update:modelValue',
	'click',
	'change',
	'focus',
	'blur',
	'keydown'
];

const supportingText = ['Essa informação vai ser usada para recuperar sua conta caso esqueça a senha.', 'O text deve ter até 100 caracteres'];

const args = ref({
	inputType: 'text',
	disabled: false,
	state: 'default',
	required: false,
	fluid: false,
	mobile: false,
	floatingLabel: false,
	lazy: false,
	disableAutocomplete: false,
	label: 'Texto',
	placeholder: 'Digite algo...',
	errorMessage: 'Campo obrigatório',
	mask: null,
	tooltip: '',
	tooltipIcon: 'info-outline',
	linkText: '',
	linkUrl: '',
	supportingText: 'supportingText',
	supportLink: '',
	supportLinkUrl: '',
});
</script>
