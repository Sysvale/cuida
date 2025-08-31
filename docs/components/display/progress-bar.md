# ProgressBar

ProgressBars são componentes utilizados para indicar o status e progresso de algo aos usuários.

### Quando usar

- For necessário transmitir a ideia do progresso de algo.
- For necessário transmitir a ideia do status de algo.
- Se deseja chamar a atenção do usuário para uma informação específica de maneira gráfica.

### Quando não usar

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

<PreviewContainer
	:component="CdsProgressBar"
	:events="cdsProgressBarEvents"
/>

---

## Props

<APITable
	name="ProgressBar"
	section="props"
/>
<br />

## Eventos

<APITable
	name="ProgressBar"
	section="events"
/>
<br />

## Slots

<APITable
	name="ProgressBar"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsProgressBar from '@/components/ProgressBar.vue';

const cdsProgressBarEvents = [];
</script>
