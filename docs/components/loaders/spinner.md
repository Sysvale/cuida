# Spinner

### Spinners é um componente utilizado para indicar que o progresso de uma operação ainda não foi finalizado.

---

## Quando usar:
- For necessário impedir a visualização e navegação do conteúdo de páginas enquanto houver alguma pendência de operação
- Para carregamento de páginas completas
- Em operações que não têm progresso determinado
- Como indicador universal de carregamento

## Quando não usar:
- A visualização e navegação não puder ser interrompida
- Para elementos específicos de uma página (use OverlayLoader)
- Quando é possível usar Skeleton para mostrar a estrutura do conteúdo

## Observações:
- O Spinner oferece feedback visual contínuo para operações em andamento
- Suporta diferentes tamanhos: sm, md, lg
- Oferece várias variantes de cores para combinar com o design
- Inclui opção de delay para evitar flashes em carregamentos rápidos
- É o componente mais genérico para indicação de carregamento

## Uso

### Exemplo básico

```vue
<template>
  <div>
    <cds-spinner
      variant="green"
      size="md"
    />
  </div>
</template>
```

### Exemplo com delay

```vue
<template>
  <div>
    <cds-spinner
      variant="blue"
      size="lg"
      :delay="300"
    />
  </div>
</template>
```

### Exemplo condicional

```vue
<template>
  <div>
    <cds-button @click="startLoading">
      Iniciar Carregamento
    </cds-button>
    
    <div v-if="isLoading" style="text-align: center; margin-top: 20px;">
      <cds-spinner variant="blue" size="md" />
      <p>Carregando...</p>
    </div>
    
    <div v-else-if="loadingComplete">
      <p>Carregamento concluído!</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoading = ref(false);
const loadingComplete = ref(false);

const startLoading = () => {
  isLoading.value = true;
  loadingComplete.value = false;
  
  setTimeout(() => {
    isLoading.value = false;
    loadingComplete.value = true;
  }, 3000);
};
</script>
```

## Preview

<div style="text-align: center; padding: 40px; border: 1px solid #e0e0e0; border-radius: 8px;">
  <cds-spinner variant="green" size="md" />
</div>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `string` | `'blue'` | Variante de cor: 'green', 'teal', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'white' |
| `size` | `string` | `'md'` | Tamanho do spinner: 'sm', 'md', 'lg' |
| `delay` | `number` | `0` | Delay em milissegundos antes de mostrar o spinner |

## Eventos

Este componente não emite eventos.

## Slots

Este componente não possui slots.

## Figma

[Spinner no Figma](https://www.figma.com/design/design-system-url)
