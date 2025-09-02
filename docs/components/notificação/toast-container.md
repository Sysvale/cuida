# ToastContainer

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
<CdsToastContainer
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="toastContainerClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsToastContainer"
	:events="cdsToastContainerEvents"
/>

---

## Props

<APITable
	name="ToastContainer"
	section="props"
/>
<br />

## Eventos

<APITable
	name="ToastContainer"
	section="events"
/>
<br />

## Slots

<APITable
	name="ToastContainer"
	section="slots"
/>

<script setup>
import CdsToastContainer from '@/components/ToastContainer.vue';

const cdsToastContainerEvents = [
	'toastContainer-click'
];
</script>
