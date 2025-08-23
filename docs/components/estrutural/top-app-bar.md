# TopAppBar

### O TopAppBar é um componente de barra de aplicação responsivo que pode exibir um título, um logotipo, um botão de menu e ações personalizadas.

---

## Quando usar:
- Quando for necessário um cabeçalho fixo e responsivo para a aplicação
- Quando houver necessidade de um botão de menu ou de navegação para melhorar a experiência do usuário
- Quando for necessário exibir um logotipo ou título na parte superior da interface
- Quando houver ações que precisam estar sempre acessíveis na barra superior

## Quando não usar:
- Quando a aplicação não precisa de uma barra de navegação fixa
- Quando a interface já possui outra estrutura de navegação redundante
- Quando o espaço na tela é muito limitado e um cabeçalho fixo pode comprometer a usabilidade

## Observações:
- O TopAppBar é totalmente responsivo e se adapta a diferentes tamanhos de tela
- Suporta navegação com botão de voltar quando configurado
- Permite customização de logotipo e título
- Oferece slots para ações personalizadas
- Integra-se bem com sistemas de roteamento

## Uso

### Exemplo básico

```vue
<template>
  <cds-top-app-bar
    title="Título legal"
    show-menu-icon
    @on-menu-click="handleMenuClick"
  />
</template>

<script setup>
const handleMenuClick = () => {
  console.info('Menu click emitted');
};
</script>
```

### Exemplo com logotipo e navegação

```vue
<template>
  <cds-top-app-bar
    title="Título bacana"
    logoUrl="https://example.com/logo.svg"
    :showMenuIcon="true"
    :showBackNavigation="false"
    :defaultRoute="{ name: 'rota-default' }"
    @on-menu-click="handleMenuClick"
  />
</template>

<script setup>
const handleMenuClick = () => {
  console.info('Menu clicked');
};
</script>
```

## Preview

<cds-top-app-bar
  title="Título bacana"
  logoUrl="https://framerusercontent.com/images/xz7CrU73qctPY2Vm79XMnTAVM.svg"
  :showMenuIcon="true"
  :showBackNavigation="false"
/>

## Props

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `title` | `string` | `''` | Título exibido na barra |
| `logoUrl` | `string` | `''` | URL do logotipo a ser exibido |
| `showMenuIcon` | `boolean` | `false` | Define se o ícone de menu deve ser exibido |
| `showBackNavigation` | `boolean` | `false` | Define se o botão de voltar deve ser exibido |
| `defaultRoute` | `object` | `null` | Rota padrão para navegação |

## Eventos

| Nome | Descrição |
|------|-----------|
| `on-menu-click` | Emitido quando o botão de menu é clicado |

## Slots

| Nome | Descrição |
|------|-----------|
| `actions` | Slot para ações personalizadas no lado direito da barra |

## Figma

[TopAppBar no Figma](https://www.figma.com/design/design-system-url)
