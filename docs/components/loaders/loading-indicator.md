# LoadingIndicator

### O LoadingIndicator é um componente utilizado para indicar o progresso do carregamento da página, proporcionando uma experiência de usuário mais fluida e informativa.

---

## Quando usar:
- Em navegações entre páginas ou abas dentro de uma aplicação, onde o usuário precisa visualizar o progresso de carregamento de forma clara para saber que a transição está em andamento
- Em aplicações onde o carregamento de conteúdo pode demorar, como em operações de rede ou carregamento de dados pesados
- Para indicação de progresso de carregamento de páginas completas
- Em transições de estado que requerem feedback visual

## Quando não usar:
- Para o carregamento de dados secundários ou ações que não afetam diretamente a navegação principal do usuário
- Quando o usuário realiza interações que podem desencadear novos carregamentos, como o acionamento de um toggle switch. Nesses casos, considere o uso de alternativas como o **Skeleton** para mostrar o conteúdo sendo carregado ou o **Spinner** para indicar que uma ação está em andamento

## Observações:
- O LoadingIndicator fornece feedback visual contínuo sobre o progresso de carregamento
- Suporta diferentes variantes de cores para combinar com o design da aplicação
- É controlado via v-model, permitindo controle preciso do estado
- Ideal para operações assíncronas que podem demorar
- Melhora a percepção de performance da aplicação

## Uso

### Exemplo básico

```vue
<template>
  <div>
    <cds-button @click="toggleLoading">
      Toggle LoadingIndicator
    </cds-button>
    <cds-loading-indicator
      v-model="showLoadingIndicator"
      variant="blue"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showLoadingIndicator = ref(false);

const toggleLoading = () => {
  showLoadingIndicator.value = !showLoadingIndicator.value;
};
</script>
```

### Exemplo com diferentes variantes

```vue
<template>
  <div>
    <cds-loading-indicator
      v-model="isLoading"
      variant="green"
      :intervalTime="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoading = ref(true);

// Simular carregamento
setTimeout(() => {
  isLoading.value = false;
}, 3000);
</script>
```

## Preview

<div style="text-align: center; padding: 40px; border: 1px solid #e0e0e0; border-radius: 8px;">
  <cds-loading-indicator variant="blue" :intervalTime="500" />
</div>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `boolean` | `false` | Controla a visibilidade do loading indicator |
| `variant` | `string` | `'blue'` | Variante de cor: 'green', 'teal', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' |
| `intervalTime` | `number` | `100` | Intervalo de tempo para a animação em milissegundos |

## Eventos

| Nome | Descrição |
|------|-----------|
| `update:modelValue` | Emitido quando o estado de visibilidade é alterado |

## Slots

Este componente não possui slots.

## Figma

[LoadingIndicator no Figma](https://www.figma.com/design/design-system-url)
