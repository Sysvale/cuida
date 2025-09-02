# FileViewer

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
<CdsFileViewer
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="fileViewerClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsFileViewer"
	:events="cdsFileViewerEvents"
/>

---

## Props

<APITable
	name="FileViewer"
	section="props"
/>
<br />

## Eventos

<APITable
	name="FileViewer"
	section="events"
/>
<br />

## Slots

<APITable
	name="FileViewer"
	section="slots"
/>

<script setup>
import CdsFileViewer from '@/components/FileViewer.vue';

const cdsFileViewerEvents = [
	'fileViewer-click'
];
</script>
