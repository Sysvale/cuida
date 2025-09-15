# StepperInput

### StepperInputs são inputs numéricos com botões de incremento e decremento sempre visíveis.
---
<br />

## Quando usar:
- For necessário precisar de um input do tipo número.
- O número a ser adicionado ao StepperInput for pequeno ou de poucos dígitos.

<br />

## Quando não usar:
- O dado a ser utilizado no componente não for numérico.
- O dado a ser utilizado  no componente for muito grande.
- O dado a ser utilizado no componente não for incremental.

## Observações:
- A propriedade `width` não tem efeito quando a propriedade `mobile` está configurada para `true`.

<br />

---

## Uso

```js
<CdsStepperInput
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="stepperInputClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsStepperInput"
	:events
/>

---

## Props

<APITable
	name="StepperInput"
	section="props"
/>
<br />

## Eventos

<APITable
	name="StepperInput"
	section="events"
/>
<br />

## Slots

<APITable
	name="StepperInput"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsStepperInput from '@/components/StepperInput.vue';

const events = [
	'invalid-number',
	'step-out-of-bounds',
	'update:modelValue'
];

const args = ref({
	mobile: false,
	step: 1,
	disabled: false,
	required: true,
	fluid: false,
	suffix: '',
});
</script>
