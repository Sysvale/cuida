# OverlayLoader

### OverlayLoader é utilizado para indicar o carregamento de componentes internos de páginas, como cards e gráficos.

---

## Quando usar:
- Para indicar o carregamento de elementos de página que ainda não possuam skeleton implementado
- Em cards, gráficos e outros componentes que precisam de feedback de carregamento
- Quando é necessário sobrepor um loading em elementos específicos
- Para carregamento de conteúdo localizado dentro de seções da página

## Quando não usar:
- Não utilize o OverlayLoader para carregamento de páginas. Nesses casos prefira o Spinner
- Não utilize o OverlayLoader para indicar carregamento de componentes que possuam skeletons implementados
- Para operações rápidas que não justificam feedback visual

## Observações:
- O OverlayLoader cria uma sobreposição visual sobre o conteúdo
- Suporta diferentes tamanhos: sm, md, lg
- Oferece várias variantes de cores para combinar com o design
- É ideal para carregamento de componentes específicos
- Mantém o contexto visual do elemento sendo carregado

## Uso

### Exemplo básico

```vue
<template>
  <div style="position: relative; height: 200px; background: #f5f5f5;">
    <cds-overlay-loader
      variant="green"
      size="md"
    />
  </div>
</template>
```

### Exemplo condicional em card

```vue
<template>
  <div class="card" style="position: relative;">
    <h3>Dados do Gráfico</h3>
    <div v-if="!isLoading">
      <!-- Conteúdo do gráfico -->
      <p>Gráfico carregado</p>
    </div>
    <cds-overlay-loader
      v-if="isLoading"
      variant="blue"
      size="lg"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(() => {
  // Simular carregamento
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});
</script>

<style scoped>
.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 200px;
}
</style>
```

## Preview

<div style="position: relative; height: 150px; background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
  <span style="color: #666;">Conteúdo carregando...</span>
  <cds-overlay-loader variant="green" size="md" />
</div>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `string` | `'blue'` | Variante de cor: 'green', 'teal', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'white' |
| `size` | `string` | `'md'` | Tamanho do loader: 'sm', 'md', 'lg' |

## Eventos

Este componente não emite eventos.

## Slots

Este componente não possui slots.

## Figma

[OverlayLoader no Figma](https://www.figma.com/design/design-system-url)
