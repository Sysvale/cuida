# TextArea

### TextAreas permitem que os usuários insiram um texto longo em uma interface.
---
<br>

## Quando usar:
- Necessitar de um campo de texto para inserir informações grandes. Exemplo: Descrição de produto ou mensagens.

<br>

## Quando não usar:
- For necessário informar apenas um dado específico ao campo de texto.

---

## Uso

```js
<CdsTextArea
	v-model="inputValue"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsTextArea"
	:events
/>

---

## Props

<APITable
	name="CdsTextArea"
	section="props"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsTextArea from '@/components/TextArea.vue';

const events = [
	'update:modelValue',
	'focus',
	'blur',
];

const args = ref({
	disabled: false,
	state: 'default',
	required: false,
	fluid: false,
	floatingLabel: false,
	lazy: false,
	label: 'Texto',
	placeholder: 'Digite algo...',
	errorMessage: 'Campo obrigatório',
	tooltip: '',
	tooltipIcon: 'info-outline',
	supportingText: 'supportingTex',
	supportLink: '',
	supportLinkUrl: '',
});
</script>
