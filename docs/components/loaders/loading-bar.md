# LoadingBar

### LoadingBars é um componente utilizado para indicar que o progresso de uma operação ainda não foi finalizado.

---

## Quando usar:
- For necessário impedir a visualização e navegação do conteúdo de páginas enquanto houver alguma pendência de operação
- Em situações onde o carregamento bloqueia a interface
- Para indicar progresso de operações longas ou críticas
- Quando é necessário feedback visual de carregamento global

## Quando não usar:
- A visualização e navegação não puder ser interrompida
- Para carregamentos rápidos ou localizados
- Quando o usuário precisa continuar interagindo com a interface

## Observações:
- O LoadingBar fornece feedback visual simples e direto
- É ideal para operações que bloqueiam a interface temporariamente
- Mantém o usuário informado sobre o estado de carregamento
- Design minimalista que não interfere na experiência visual
- Pode ser usado em overlays ou como parte da interface

## Uso

### Exemplo básico

```vue
<template>
  <cds-loading-bar />
</template>
```

### Exemplo com controle condicional

```vue
<template>
  <div>
    <cds-loading-bar v-if="isLoading" />
    <div v-else>
      <!-- Conteúdo carregado -->
    </div>
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
  <cds-loading-bar />
</div>

## Props

Este componente não possui props.

## Eventos

Este componente não emite eventos.

## Slots

Este componente não possui slots.

## Figma

[LoadingBar no Figma](https://www.figma.com/design/design-system-url)
