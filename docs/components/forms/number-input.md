# NumberInput

O componente NumberInput permite que os usuários insiram e editem valores numéricos em uma interface.

### Quando usar

- Precisar de um campo para que os usuários insiram informações exclusivamente numéricas, como:
	- Quantidades (por exemplo, número de itens em um carrinho de compras).
	- Valores monetários (por exemplo, preços, descontos).
	- Idades, medidas, ou qualquer outro dado que seja estritamente numérico.
- A entrada de dados for numérica e não exigir texto livre ou seleção de opções pré-definidas.

### Quando não usar

- O dado a ser inserido for textual. Nesse caso, considere usar o componente `TextInput`.
- O tipo de uso envolver valores incrementais. Nesse caso, considere usar o componente `StepperInput`.

---

## Uso

```js
<CdsNumberInput />
```

---

## Preview

<PreviewBuilder
	:component="CdsNumberInput"
	:events="cdsNumberInputEvents"
/>

---

## Props

<APITable
	name="NumberInput"
	section="props"
/>
<br />

## Eventos

<APITable
	name="NumberInput"
	section="events"
/>
<br />

## Slots

<APITable
	name="NumberInput"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsNumberInput from '@/components/NumberInput.vue';

const cdsNumberInputEvents = [
	'update:modelValue',
	'update:unmaskedValue',
	'click',
	'change',
	'focus',
	'blur',
	'keydown'
];
</script>
