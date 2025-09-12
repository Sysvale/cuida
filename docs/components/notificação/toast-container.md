# ToastContainer

### O ToastContainer é um componente global utilizado para gerenciar e exibir múltiplos Toasts na aplicação.Ele controla a posição, o enfileiramento e a animação dos Toasts.
---
<br />

## Quando usar:
- Para garantir que os Toasts não se sobreponham a outros elementos importantes da interface.
- Para exibir informações suplementares sobre uma feature ou elemento da interface.


<br />

## Quando não usar:
- Para comunicar erros e status do sistema.
- Para mostrar informações críticas para a compreensão de uma feature ou elemento da interface.

<br />

## ⚠️ Observações:
- O `ToastContainer` deve ser instanciado uma vez na aplicação, geralmente no App.vue.
Ele observará alterações na propriedade toastState do o useToast e renderizará os Toasts de acordo com as configurações passadas.
- Para que o componente funcione como esperado, é necessário importar o composable useToast e chamar o método fire().

<br />

## Como configurar

#### Importando o useToast no main.js ou app.js
```js
...
app.use(Cuida);
const cdsUtils = Cuida.utils;

app.provide('useToast', cdsUtils.useToast);
...
```

#### Importando o ToastContainer no App.vue
```html
...
<template>
	<div>
		<router-view />
		<CdsToastContainer />
	</div>
</template>
...
```

#### Disparando Toast na aplicação
```js
const useToast = inject('useToast');

useToast().fire({
	title: 'Processando dados',
	description: 'Estamos processando os dados da planilha. Essa ação pode levar alguns minutos.',
	dismissible: true,
	dismissAfter: 6000,
	autoDismissible: true,
	variant: 'success',
	light: false,
})
```
---

## Preview

<PreviewContainer>
	<CdsToastContainer />
	<CdsButton
		@button-click="showToast"
		text="Mostrar grupo de Toasts"
	/>
</PreviewContainer>

---


<script setup>
import { ref } from 'vue';
import CdsToastContainer from '@/components/ToastContainer.vue';
import { useToast } from '@/utils/composables/useToast.js';

const args = ref({});

const cdsToastContainerEvents = [
	'toastContainer-click'
];

function showToast(event) {
	useToast().fire({
		title: 'Processando dados',
		description: 'Estamos processando os dados da planilha. Essa ação pode levar alguns minutos.',
		dismissible: true,
		dismissAfter: 6000,
		autoDismissible: true,
		variant: 'success',
		light: false,
	})

	useToast().fire({
		title: 'Processando dados',
		description: 'Estamos processando os dados da planilha. Essa ação pode levar alguns minutos.',
		dismissible: true,
		dismissAfter: 6000,
		autoDismissible: true,
		variant: 'info',
		light: false,
	})

	useToast().fire({
		title: 'Processando dados',
		description: 'Estamos processando os dados da planilha. Essa ação pode levar alguns minutos.',
		dismissible: true,
		dismissAfter: 6000,
		autoDismissible: true,
		variant: 'warning',
		light: false,
	})

	useToast().fire({
		title: 'Processando dados',
		description: 'Estamos processando os dados da planilha. Essa ação pode levar alguns minutos.',
		dismissible: true,
		dismissAfter: 6000,
		autoDismissible: true,
		variant: 'danger',
		light: false,
	})
}
</script>
