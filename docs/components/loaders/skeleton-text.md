# SkeletonText

### Skeleton texts permitem exibir um estado de carregamento para vários tipos de componentes enquanto seus dados estão sendo buscados.

---

## Quando usar:
- Informar ao usuário que as informações do componente estão sendo carregadas
- O conteúdo a ser carregado for dinâmico
- Para simular linhas de texto durante o carregamento
- Em listas de conteúdo textual que estão sendo carregadas

## Quando não usar:
- O conteúdo a ser carregado for estático
- Para carregamento de elementos não textuais (use Skeleton comum)
- Quando o carregamento é muito rápido para justificar feedback visual

## Observações:
- O SkeletonText deve ser ajustado de acordo com o componente a ser utilizado
- Oferece animação suave que simula o carregamento de texto
- Pode ser dimensionado dinamicamente para diferentes comprimentos de texto
- Ideal para simular parágrafos, títulos e outros elementos textuais
- Combina bem com outros skeletons para criar layouts completos

## Uso

### Exemplo básico

```vue
<template>
  <div>
    <cds-skeleton-text :width="250" />
  </div>
</template>
```

### Exemplo simulando parágrafo

```vue
<template>
  <div v-if="isLoading" class="skeleton-paragraph">
    <cds-skeleton-text :width="300" />
    <cds-skeleton-text :width="280" />
    <cds-skeleton-text :width="200" />
  </div>
  <div v-else>
    <!-- Conteúdo real -->
    <p>Lorem ipsum dolor sit amet...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>

<style scoped>
.skeleton-paragraph {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```

## Preview

<div style="padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <cds-skeleton-text :width="300" />
    <cds-skeleton-text :width="250" />
    <cds-skeleton-text :width="180" />
  </div>
</div>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `width` | `number\|string` | `200` | Largura do skeleton text em pixels |
| `height` | `number\|string` | `16` | Altura do skeleton text em pixels |

## Eventos

Este componente não emite eventos.

## Slots

Este componente não possui slots.

## Figma

[SkeletonText no Figma](https://www.figma.com/design/design-system-url)
