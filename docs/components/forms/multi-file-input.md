# MultiFileInput

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
<CdsMultiFileInput
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="multiFileInputClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsMultiFileInput"
	:events="cdsMultiFileInputEvents"
/>

---

## Props

<APITable
	name="MultiFileInput"
	section="props"
/>
<br />

## Eventos

<APITable
	name="MultiFileInput"
	section="events"
/>
<br />

## Slots

<APITable
	name="MultiFileInput"
	section="slots"
/>

<script setup>
import CdsMultiFileInput from '@/components/MultiFileInput.vue';

const cdsMultiFileInputEvents = [
	'multiFileInput-click'
];
</script>
