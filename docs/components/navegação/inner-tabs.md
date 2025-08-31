# InnerTabs

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
<CdsInnerTabs
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="innerTabsClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsInnerTabs"
	:events="cdsInnerTabsEvents"
/>

---

## Props

<APITable
	name="InnerTabs"
	section="props"
/>
<br />

## Eventos

<APITable
	name="InnerTabs"
	section="events"
/>
<br />

## Slots

<APITable
	name="InnerTabs"
	section="slots"
/>

<script setup>
import CdsInnerTabs from '@/components/InnerTabs.vue';

const cdsInnerTabsEvents = [
	'innerTabs-click'
];
</script>
