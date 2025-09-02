# Label

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
<CdsLabel
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="labelClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsLabel"
	:events="cdsLabelEvents"
/>

---

## Props

<APITable
	name="Label"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Label"
	section="events"
/>
<br />

## Slots

<APITable
	name="Label"
	section="slots"
/>

<script setup>
import CdsLabel from '@/components/Label.vue';

const cdsLabelEvents = [
	'label-click'
];
</script>
