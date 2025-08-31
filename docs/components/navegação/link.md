# Link

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
<CdsLink
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="linkClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsLink"
	:events="cdsLinkEvents"
/>

---

## Props

<APITable
	name="Link"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Link"
	section="events"
/>
<br />

## Slots

<APITable
	name="Link"
	section="slots"
/>

<script setup>
import CdsLink from '@/components/Link.vue';

const cdsLinkEvents = [
	'link-click'
];
</script>
