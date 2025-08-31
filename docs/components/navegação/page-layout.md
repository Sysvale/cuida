# PageLayout

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
<CdsPageLayout
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="pageLayoutClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsPageLayout"
	:events="cdsPageLayoutEvents"
/>

---

## Props

<APITable
	name="PageLayout"
	section="props"
/>
<br />

## Eventos

<APITable
	name="PageLayout"
	section="events"
/>
<br />

## Slots

<APITable
	name="PageLayout"
	section="slots"
/>

<script setup>
import CdsPageLayout from '@/components/PageLayout.vue';

const cdsPageLayoutEvents = [
	'pageLayout-click'
];
</script>
