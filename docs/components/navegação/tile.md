# Tile

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
<CdsTile
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="tileClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsTile"
	:events="cdsTileEvents"
/>

---

## Props

<APITable
	name="Tile"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Tile"
	section="events"
/>
<br />

## Slots

<APITable
	name="Tile"
	section="slots"
/>

<script setup>
import CdsTile from '@/components/Tile.vue';

const cdsTileEvents = [
	'tile-click'
];
</script>
