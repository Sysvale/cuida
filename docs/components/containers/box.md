# Box

### Boxes são componentes básicos de container que encapsulam conteúdo com o estilo padrão de borda, de sombra e de padding do cuida. Podem ser utilizados como componente primivo para cards, popovers, modais, etc.

---

## Uso

```js
<CdsBox
	:elevated="false"
>
	2
</CdsBox>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsBox"
	:events="cdsBoxEvents"
>
	2
</PreviewBuilder>

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


<script setup>
import { ref } from 'vue';
import CdsBox from '@/components/Box.vue';

const cdsBoxEvents = [
	'boxClick'
];

const args = ref({});
</script>
