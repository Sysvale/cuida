# Box

Boxes são componentes básicos de container que encapsulam conteúdo com o estilo padrão de borda, de sombra e de padding do cuida. Podem ser utilizados como componente primitivo para cards, popovers, modais, etc.

### Quando usar

- Como container básico para encapsular conteúdo com estilo padrão.
- Como componente primitivo para construir cards, popovers, modais e outros containers.
- Quando precisar de um container simples com estilo consistente.

### Quando não usar

- Quando precisar de funcionalidades específicas de outros containers como Card ou Modal.
- Para conteúdo que não precisa de encapsulamento visual.

---

## Uso

```js
<CdsBox
	:elevated="false"
>
	Conteúdo do Box
</CdsBox>
```

---

## Preview

<DemoContainer
	:component="CdsBox"
	:events="cdsBoxEvents"
/>

---

## Props

<APITable
	name="Box"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Box"
	section="events"
/>
<br />

## Slots

<APITable
	name="Box"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsBox from '@/components/Box.vue';
import APITable from '../../docgen/APITable.vue';
import DemoContainer from '../../docgen/DemoContainer.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

const cdsBoxEvents = [];
</script>
