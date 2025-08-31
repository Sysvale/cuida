# Modal

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
<CdsModal
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="modalClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsModal"
	:events="cdsModalEvents"
/>

---

## Props

<APITable
	name="Modal"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Modal"
	section="events"
/>
<br />

## Slots

<APITable
	name="Modal"
	section="slots"
/>

<script setup>
import CdsModal from '@/components/Modal.vue';

const cdsModalEvents = [
	'modal-click'
];
</script>
