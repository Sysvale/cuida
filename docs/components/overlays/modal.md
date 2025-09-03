# Modal

### Modais são como dialogs personolizados, janelas que exibem um conteúdo adicional em uma camada acima da página atual, com uma sobreposição de superfície (overlay) cobrindo a página e tornando-a temporariamente inacessível.
---
<br />

## Quando usar:
- For necessário notificar o usuário de algum processo;
- For necessário uma tomada de decisão para completar uma ação;
- Se deseja realizar ação dentro de uma página paralelo ao fluxo principal da mesma;

<br />

## Quando não usar:
- For necessário exibir uma grande quantidade de informação ou fluxos complexos;
- For necessário ser usado em conjunto com outros modais e popovers (cascata).

---

## Uso

```js
<CdsModal
	v-mode="modelValue" 
	title="Título do modal"
	size="lg"
	disable-ok-button
	disable-cancel-button
	@close="closeHandler"
	@ok="okHandler"
	@cancel="cancelHandler"
>
	<span>
		Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Tá deprimidis,
		eu conheço uma cachacis que pode alegrar sua vidis.Paisis, filhis, espiritis santis.Leite de capivaris,
		leite de mula manquis sem cabeça.
	</span>
</CdsModal>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsModal"
	:events="cdsModalEvents"
	with-trigger
	@trigger-click="args.modelValue = !args.modelValue"
>
	<span>
		Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Tá deprimidis,
		eu conheço uma cachacis que pode alegrar sua vidis.Paisis, filhis, espiritis santis.Leite de capivaris,
		leite de mula manquis sem cabeça.
	</span>
</PreviewBuilder>

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
import { ref } from 'vue';
import CdsModal from '@/components/Modal.vue';

const showModal = ref(false);

const args = ref({});

const cdsModalEvents = [
	'close',
	'update:modelValue',
	'ok',
	'cancel'
];
</script>
