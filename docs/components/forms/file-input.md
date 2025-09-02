# FileInput

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
<CdsFileInput
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="fileInputClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsFileInput"
	:events="cdsFileInputEvents"
/>

---

## Props

<APITable
	name="FileInput"
	section="props"
/>
<br />

## Eventos

<APITable
	name="FileInput"
	section="events"
/>
<br />

## Slots

<APITable
	name="FileInput"
	section="slots"
/>

<script setup>
import CdsFileInput from '@/components/FileInput.vue';

const cdsFileInputEvents = [
	'fileInput-click'
];
</script>
