# DialogModal

O DialogModal é um componente utilizado para interagir com o usuário em situações críticas ou informativas.

---

### Quando usar

- Quando for necessário obter a confirmação do usuário para ações que podem ter consequências significativas, como excluir um item;
- Quando ocorrer um erro no sistema e o usuário precisar ser notificado;
- Quando for necessário informar o usuário sobre algo importante**, **mas que não requer uma ação imediata.

### Quando não usar

- Quando as mensagens a serem passadas ao usuário forem triviais e não exijam a atenção imediata do usuário. Nestes casos, considere usar notificações ou alertas.

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

<ClientOnly>
	<PreviewBuilder
		:args
		:component="CdsDialogModal"
		:events="cdsDialogModalEvents"
		with-trigger
		@trigger-click="args.modelValue = !args.modelValue"
	/>
</ClientOnly>

---

## Props

<APITable
	name="CdsDialogModal"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsDialogModal"
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
