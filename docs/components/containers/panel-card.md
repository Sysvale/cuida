# PanelCard

PanelCards são componentes utilizados para agrupar informação em containers com uma estrutura mínima formada por título, subtítulo, e conteúdo.

### Quando usar

- Houver a construção de páginas e dashboards com cards em grid.
- O slot de ações deve agrupar ícones ou botões que aplicam mudanças em todas as informações contidas no PanelCard.

### Quando não usar

- For necessário agrupar elementos fora da estrutura básica: título + subtítulo + conteúdo.
- Ele for o único componente do seu tipo na página, ocupando toda a largura disponível.

---

## Uso

```js
<CdsPanelCard
	title="Redes"
	subtitle="Habilite as redes da regulação"
>
	<template #panel-actions>
		<strong>#</strong>
	</template>
	Conteúdo do PanelCard
</CdsPanelCard>
```

---

## Preview

<DemoContainer
	:component="CdsPanelCard"
	:events="cdsPanelCardEvents"
/>

---

## Props

<APITable
	name="PanelCard"
	section="props"
/>
<br />

## Eventos

<APITable
	name="PanelCard"
	section="events"
/>
<br />

## Slots

<APITable
	name="PanelCard"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsPanelCard from '@/components/PanelCard.vue';
import APITable from '../../docgen/APITable.vue';
import DemoContainer from '../../docgen/DemoContainer.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

const cdsPanelCardEvents = [];
</script>
