# Toast

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
<CdsToast
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="toastClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsToast"
	:events="cdsToastEvents"
/>

---

## Props

<APITable
	name="Toast"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Toast"
	section="events"
/>
<br />

## Slots

<APITable
	name="Toast"
	section="slots"
/>

<script setup>
import CdsToast from '@/components/Toast.vue';

const cdsToastEvents = [
	'toast-click'
];
</script>
