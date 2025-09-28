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
	with-trigger
	@trigger-click="args.modelValue = !args.modelValue"
/>

---

## Props

<APITable
	name="DialogModal"
	section="props"
/>
<br>

## Eventos

<APITable
	name="DialogModal"
	section="events"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsDialogModal from '@/components/DialogModal.vue';

const args = ref({
	title: 'Tem certeza que deseja continuar?',
	description: `Esta ação afetará o sistema e
		os arquivos associados. Ao prosseguir, você
		confirma que está ciente e
		concorda com as consequências. Deseja continuar?`
});

const cdsDialogModalEvents = [
	'close',
	'update:modelValue',
	'ok',
];
</script>
