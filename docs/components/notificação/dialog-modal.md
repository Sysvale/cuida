# DialogModal

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
<CdsDialogModal
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="dialogModalClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsDialogModal"
	:events="cdsDialogModalEvents"
/>

---

## Props

<APITable
	name="DialogModal"
	section="props"
/>
<br />

## Eventos

<APITable
	name="DialogModal"
	section="events"
/>
<br />

## Slots

<APITable
	name="DialogModal"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsDialogModal from '@/components/DialogModal.vue';

const args = ref({});

const cdsDialogModalEvents = [
	'dialogModal-click'
];
</script>
