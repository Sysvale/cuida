# Toast

Toasts são componentes utilizados para prover feedback breve e notificações não intrusivas sobre o status de uma ação ou evento do sistema.

---
<br>

## Quando usar:
- Para exibir mensagens de feedback temporárias (ex: "Item salvo com sucesso", "Erro ao processar solicitação").
- Para notificar o usuário sobre eventos do sistema que não exigem ação imediata (ex: "Arquivo processado com sucesso").
- Quando a informação a ser exibida é importante, mas não crítica a ponto de interromper o fluxo do usuário.


<br>

## Quando não usar:
- Para mensagens críticas que exigem a atenção e confirmação imediata do usuário (considere usar `Alert` ou `DialogModal`).
- Quando a mensagem precisa permanecer visível indefinidamente até que o usuário a dispense manualmente (considere usar `Alert`).

<br>

## ⚠️ Observações:
Evite usar o Toast diretamente. Em vez disso, utilize-o programaticamente através do composable useToast
(disponível em src/utils/composables/useToast.js) em conjunto com o componente ToastContainer.
Essa abordagem centraliza o gerenciamento de múltiplos toasts e evita conflitos de renderização
vários toasts são disparados simultaneamente na mesma interface.

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

<PreviewBuilder
	:args
	:component="CdsToast"
	with-trigger
	:events="cdsToastEvents"
	@trigger-click="args.modelValue = !args.modelValue"
/>

---

## Props

<APITable
	name="CdsToast"
	section="props"
/>
<br>

## Events

<APITable
	name="CdsToast"
	section="events"
/>

<script setup>
import { ref } from 'vue';
import CdsToast from '@/components/Toast.vue';

const args = ref({
	variant: 'success',
	light: false,
	title: 'Título do tooltip',
	description: 'Breve feedback ou notificação',
	dismissible: true,
	dismissAfter: 6000,
	autoDismissible: true,
});

const cdsToastEvents = [
	'dismiss',
	'update:modelValue'
];
</script>
