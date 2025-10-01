# Tooltip

### Tooltip são labels flutuantes não interativas usados para explicar um elemento ou recurso da interface. Podem ser acionados com hover.
---
<br>

## Quando usar:
- O texto a ser exibido como label for conciso, com no máximo 4 palavras.
- Para exibir informações suplementares sobre uma feature ou elemento da interface.


<br>

## Quando não usar:
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

<PreviewBuilder
	:args
	:component="CdsTooltip"
>
	Tooltip trigger
</PreviewBuilder>

---

## Props

<APITable
	name="CdsTooltip"
	section="props"
/>
<br>

## Slots

<APITable
	name="CdsTooltip"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsTooltip from '@/components/Tooltip.vue';

const args = ref({
	text: 'Texto do tooltip',
});
</script>
