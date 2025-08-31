# Tooltip

Tooltip são labels flutuantes não interativas usados para explicar um elemento ou recurso da interface. Podem ser acionados com hover.

### Quando usar

- O texto a ser exibido como label for conciso, com no máximo 4 palavras.
- Para exibir informações suplementares sobre uma feature ou elemento da interface.

### Quando não usar

- Para comunicar erros e status do sistema.
- Para mostrar informações críticas para a compreensão de uma feature ou elemento da interface.

---

## Uso

```js
<CdsTooltip
	text="Texto do tooltip"
>
	Tooltip trigger
</CdsTooltip>
```

---

## Preview

<PreviewContainer
	:component="CdsTooltip"
	:events="cdsTooltipEvents"
/>

---

## Props

<APITable
	name="Tooltip"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Tooltip"
	section="events"
/>
<br />

## Slots

<APITable
	name="Tooltip"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsTooltip from '@/components/Tooltip.vue';
import APITable from '../../docgen/APITable.vue';
import DemoContainer from '../../docgen/DemoContainer.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

const cdsTooltipEvents = [];
</script>
