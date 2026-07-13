# BaseInput

BaseInput é o componente base para todos os tipos de inputs, fornecendo a estrutura e funcionalidades comuns.

---

O BaseInput deve ser utilizado como base para a criação de novos componentes de input.
Ele fornece a estrutura básica e funcionalidades comuns, como gerenciamento de estado, validação e estilização, etc.

<br>

## Quando usar:
- Na implementação de componentes do tipo input, com exceção de checkboxes, radios, ranges e files.

<br>

## Quando não usar:
- ⚠️ **Atenção:** Este componente **não deve** ser utilizado diretamente na aplicação, mas sim como base para a criação de novos componentes de input..

---

## Uso

```js
<CdsBaseInput
	v-model="inputValue"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsBaseInput"
	:events="cdsBaseInputEvents"
/>

---

## Props

<APITable
	name="CdsBaseInput"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsBaseInput"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsBaseInput"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsBaseInput from '@/components/BaseInput.vue';

const cdsBaseInputEvents = [
	'supportLinkClick',
	'blur',
	'change',
	'click',
	'focus',
	'keydown',
	'mouseenter',
	'mouseleave',
];

const supportingText = ['We’ll use this address if', 'Ask for help'];

const args = ref({
	type: 'text',
	state: 'default',
	disabled: false,
	floatingLabel: false,
	required: false,
	fluid: false,
	lazy: false,
	placeholder: 'Digite algo...',
	supportingText: supportingText,
	errorMessage: 'Campo obrigatório',
	tooltip: '',
	tooltipIcon: 'info-outline',
	trailingIcon: 'info-outline',
	leadingIcon: 'info-outline',
	ghost: true,
});
</script>
