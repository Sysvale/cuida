# RichTooltip

### RichTooltip, assim como Tooltips, são labels flutuantes usadas para explicar um da interface, entretanto provêem maior liberdade para descrição de textos estruturados e/ou mais longos.
---
<br />

## Quando usar:
- O texto a ser exibido como label precisar ocupar várias linhas ou seguir determinada estrurua, como "label: descritor".
- Para exibir informações suplementares sobre uma feature ou elemento da interface.


<br />

## Quando não usar:
- Com conteúdo simples, composto por poucas palavras.
- Para comunicar erros e status do sistema.
- Para mostrar informações críticas para a compreensão de uma feature ou elemento da interface.


---

## Uso

```js
<CdsRichTooltip
	v-model="showRichTooltip"
	targetId="trigger-cds-tooltip"
	defaultPlacement="bottom-start"
>
	<div>
		<p><strong>Em atendimento:</strong> 280</p>
		<p><strong>Pendentes:</strong> 60</p>
		<p><strong>Em acompanhamento:</strong> 600</p>
	</div>
</CdsRichTooltip>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsRichTooltip"
	:events="cdsRichTooltipEvents"
	with-trigger
	v-model="showRichTooltip"
	targetId="trigger-cds-tooltip"
	defaultPlacement="bottom-start"
	@trigger-click="showRichTooltip =true"
>
	<div>
		<p><strong>Em atendimento:</strong> 280</p>
		<p><strong>Pendentes:</strong> 60</p>
		<p><strong>Em acompanhamento:</strong> 600</p>
	</div>
</PreviewBuilder>

---

## Props

<APITable
	name="RichTooltip"
	section="props"
/>
<br />

## Eventos

<APITable
	name="RichTooltip"
	section="events"
/>
<br />

## Slots

<APITable
	name="RichTooltip"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
const args = ref({});
import CdsRichTooltip from '@/components/RichTooltip.vue';

const showRichTooltip = ref(false);

const cdsRichTooltipEvents = [
	'update:modelValue'
];
</script>
