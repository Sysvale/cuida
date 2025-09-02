# Pulsar

Buttons são componentes clicáveis e que indicam ao usuário que ele pode realizar uma ação ao interagir com ele.

### Quando usar

- For necessário comunicar ao usuário que ele pode executar uma ação na interface,
  seja em dialogs, modais, formulários, cards, etc.

### Quando não usar

- Não utilize botões com apenas ícone. Para esses casos de uso recomenda-se utilizar o IconButton.
- Em redirecionamentos para páginas externas. Nesses casos utilize links.

---

## Uso

```js
<CdsPulsar
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="pulsarClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsPulsar"
	:events="cdsPulsarEvents"
/>

---

## Props

<APITable
	name="Pulsar"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Pulsar"
	section="events"
/>
<br />

## Slots

<APITable
	name="Pulsar"
	section="slots"
/>

<script setup>
import CdsPulsar from '@/components/Pulsar.vue';

const cdsPulsarEvents = [
	'pulsar-click'
];
</script>
