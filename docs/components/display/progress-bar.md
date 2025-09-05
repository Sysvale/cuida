# ProgressBar

### ProgressBars são componentes utilizados para indicar o status e progresso de algo aos usuários.
---
<br />

## Quando usar:
- For necessário transmitir a ideia do progresso de algo.
- For necessário transmitir a ideia do status de algo.
- Se deseja chamar a atenção do usuário para uma informação específica de maneira gráfica.

<br />

## Quando não usar:
- For necessário criar loaders.
- For necessária muita precisão ao mostrar os números ou progresso.
- For necessário criar steppers.

---

## Uso

```js
<CdsProgressBar
	showText
	:value="0.5"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsProgressBar"
/>

---

## Props

<APITable
	name="ProgressBar"
	section="props"
/>
<br />

## Slots

<APITable
	name="ProgressBar"
	section="slots"
/>

---
<script setup>
import { ref } from 'vue';
import CdsProgressBar from '@/components/ProgressBar.vue';

const args = ref({
	value: 0.45,
	showText: true,
	textAside: false,
	textLeft: true,
	shadeSteps: 4,
	variant: 'green'
});
</script>
