# Clickable

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

<DemoContainer
	:component="CdsClickable"
	:events="cdsClickableEvents"
>
	Texto clicável
</DemoContainer>

---

## Props

<APITable
	name="Clickable"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Clickable"
	section="events"
/>
<br />

## Slots

<APITable
	name="Clickable"
	section="slots"
/>

---

<script setup>
import CdsClickable from '@/components/Clickable.vue';

const cdsClickableEvents = [
	'cds-click'
];
</script>
