# PasswordInput

PasswordInputs permitem que os usuários insiram caracteres sensíveis na interface.

### Quando usar

- Necessitar de um campo de texto para inserir informações sensíveis, como uma senha.

### Quando não usar

- O dado a ser utilizado no componente for um dado comum (Exemplo: nome ou idade).

---

## Uso

```js
<CdsPasswordInput />
```

---

## Preview

<PreviewBuilder
	:component="CdsPasswordInput"
	:events="cdsPasswordInputEvents"
/>

---

## Props

<APITable
	name="PasswordInput"
	section="props"
/>
<br />

## Eventos

<APITable
	name="PasswordInput"
	section="events"
/>
<br />

## Slots

<APITable
	name="PasswordInput"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsPasswordInput from '@/components/PasswordInput.vue';

const cdsPasswordInputEvents = [
	'update:modelValue'
];
</script>
