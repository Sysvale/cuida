# Clickable <Badge type="danger">Deprecated</Badge>

Componente utilizado para adicionar um wrapper cliclável a componentes que não possuem interação nativa por clique.

---

## Uso

```js
<CdsClickable
	:clickable="true"
	@click="logClickableClick"
>
	Texto clicável
</CdsClickable>
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsClickable"
	:events="cdsClickableEvents"
>
	Texto clicável
</PreviewBuilder>

---

## Props

<APITable
	name="CdsClickable"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsClickable"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsClickable"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsClickable from '@/components/Clickable.vue';

const args = ref({});

const cdsClickableEvents = [
	'cds-click'
];
</script>
