# PasswordInput

### PasswordInputs permitem que os usuários insiram caracteres sensíveis na interface.
---
<br>

## Quando usar:
- Necessitar de um campo de texto para inserir informações sensíveis, como uma senha.

<br>

## Quando não usar:
- O dado a ser utilizado no componente for um dado comum (Exemplo: nome ou idade).

---

## Uso

```js
<CdsPasswordInput
	v-model="inputValue"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsPasswordInput"
	:events
/>

---

## Props

<APITable
	name="CdsPasswordInput"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsPasswordInput"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsPasswordInput"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsPasswordInput from '@/components/PasswordInput.vue';

const events = [
	'update:modelValue'
];

const args = ref({});
</script>
