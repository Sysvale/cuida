# WebcamModal

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
<CdsWebcamModal
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="webcamModalClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsWebcamModal"
	:events="cdsWebcamModalEvents"
/>

---

## Props

<APITable
	name="WebcamModal"
	section="props"
/>
<br />

## Eventos

<APITable
	name="WebcamModal"
	section="events"
/>
<br />

## Slots

<APITable
	name="WebcamModal"
	section="slots"
/>

<script setup>
import CdsWebcamModal from '@/components/WebcamModal.vue';

const cdsWebcamModalEvents = [
	'webcamModal-click'
];
</script>
