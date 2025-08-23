# Skeleton

### O componente Skeleton é usado para criar espaços reservados que representam conteúdo que está carregando ou sendo processado. Ele é útil para melhorar a experiência do usuário, fornecendo feedback visual enquanto o conteúdo real está sendo carregado.

---

## Quando usar:
- Use o componente Skeleton quando o carregamento de conteúdo for perceptível para o usuário e você deseja fornecer feedback visual durante esse processo
- É especialmente útil em situações onde o tempo de carregamento do conteúdo é variável ou pode levar algum tempo para ser concluído
- Para simular a estrutura de conteúdo durante o carregamento
- Em listas, cards e outros elementos que precisam de placeholder

## Quando não usar:
- Evite usar o componente Skeleton quando o conteúdo é carregado instantaneamente, pois pode causar distração ou poluição visual desnecessária
- Não use quando o feedback visual do carregamento não for relevante para a experiência do usuário ou quando o carregamento é rápido e não perceptível
- Para carregamento de páginas completas (use LoadingIndicator)

## Observações:
- Personalize as propriedades do skeleton conforme necessário para corresponder ao layout e estilo do seu aplicativo
- O componente suporta formas de 'circle' e 'square' e pode ser dimensionado dinamicamente
- Oferece animação suave que imita o carregamento
- Pode ser combinado para criar layouts complexos de skeleton

## Uso

### Exemplo básico

```vue
<template>
  <div>
    <cds-skeleton :width="100" />
  </div>
</template>
```

### Exemplo com formas diferentes

```vue
<template>
  <div>
    <!-- Skeleton circular para avatar -->
    <cds-skeleton 
      shape="circle" 
      :width="60" 
      :height="60" 
    />
    
    <!-- Skeleton quadrado -->
    <cds-skeleton 
      shape="square" 
      :width="200" 
      :height="100" 
    />
  </div>
</template>
```

## Preview

<div style="padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
  <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px;">
    <cds-skeleton shape="circle" :width="40" :height="40" />
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <cds-skeleton :width="150" :height="16" />
      <cds-skeleton :width="100" :height="12" />
    </div>
  </div>
  <cds-skeleton :width="100" :height="20" />
</div>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `width` | `number\|string` | `100` | Largura do skeleton em pixels ou porcentagem |
| `height` | `number\|string` | `20` | Altura do skeleton em pixels |
| `shape` | `string` | `'square'` | Forma do skeleton: 'circle' ou 'square' |

## Eventos

Este componente não emite eventos.

## Slots

Este componente não possui slots.

## Figma

[Skeleton no Figma](https://www.figma.com/design/design-system-url)
