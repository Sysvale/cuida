# LoadingIndicator

### O LoadingIndicator é um componente utilizado para indicar o progresso do carregamento da página, proporcionando uma experiência de usuário mais fluida e informativa.
---
<br />

## Quando usar:
- Em navegações entre páginas ou abas dentro de uma aplicação, onde o usuário precisa visualizar o progresso de carregamento de forma clara para saber que a transição está em andamento;
- Em aplicações onde o carregamento de conteúdo pode demorar, como em operações de rede ou carregamento de dados pesados.

<br />

## Quando não usar:
- Para o carregamento de dados secundários ou ações que não afetam diretamente a navegação principal do usuário;
- Quando o usuário realiza interações que podem desencadear novos carregamentos, como o acionamento de um toggle switch. Nesses casos, considere o uso de alternativas como o **Skeleton** para mostrar o conteúdo sendo carregado ou o **Spinner** para indicar que uma ação está em andamento.

---

## Uso

```js
<CdsLoadingIndicator
	v-model="showLoadingIndicator"
	variant="blue"
/>
```

---

## Preview


<PreviewContainer
	:component="CdsLoadingIndicator"
	:modelValue="showLoadingIndicator"
>
	<template #container>
		<CdsButton
			id="trigger-popover"
			@click="showLoadingIndicator = !showLoadingIndicator"
		>
			Toggle LoadingIndicator
		</CdsButton>
	</template>
</PreviewContainer>

---

## Props

<APITable
	name="LoadingIndicator"
	section="props"
/>
<br />

---

<script setup>
import { ref } from 'vue';
import CdsLoadingIndicator from '@/components/LoadingIndicator.vue';

const showLoadingIndicator = ref(true);
</script>
