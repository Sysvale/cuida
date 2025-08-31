# Tabs

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
<CdsTabs
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="tabsClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsTabs"
	:events="cdsTabsEvents"
/>

---

## Props

<APITable
	name="Tabs"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Tabs"
	section="events"
/>
<br />

## Slots

<APITable
	name="Tabs"
	section="slots"
/>

<script setup>
import CdsTabs from '@/components/Tabs.vue';

const cdsTabsEvents = [
	'tabs-click'
];
</script>
