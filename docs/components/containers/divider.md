# Divider

Dividers são componentes utilizados para separar ou agrupar conteúdo.

### Quando usar

- Para separar seções de conteúdo de forma visual.
- Para agrupar elementos relacionados criando divisões claras.
- Em listas, formulários ou layouts que precisam de separação visual.

### Quando não usar

- Quando o espaçamento em branco já é suficiente para separar o conteúdo.
- Em layouts muito densos onde muitos dividers podem poluir a interface.

### Observações

- A prop `vertical` oculta o texto do divider.

---

## Uso

```js
<CdsDivider />
```

---

## Preview

<DemoContainer
	:component="CdsDivider"
	:events="cdsDividerEvents"
/>

---

## Props

<APITable
	name="Divider"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Divider"
	section="events"
/>
<br />

## Slots

<APITable
	name="Divider"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsDivider from '@/components/Divider.vue';
import APITable from '../../docgen/APITable.vue';
import DemoContainer from '../../docgen/DemoContainer.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

const cdsDividerEvents = [];
</script>
