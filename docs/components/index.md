# Componentes

O Cuida Design System oferece mais de 100 componentes Vue 3 prontos para uso, organizados por categoria para facilitar a navegação e descoberta.

## Categorias

### Forms
Componentes para criação de formulários interativos e acessíveis:

- [**Button**](./button) - Botões para ações primárias e secundárias
- [**BaseInput**](./base-input) - Campo de entrada base
- [**TextInput**](./text-input) - Campo de texto
- [**TextArea**](./text-area) - Área de texto
- [**Select**](./select) - Seletor dropdown
- [**Checkbox**](./checkbox) - Caixa de seleção
- [**Radio**](./radio) - Botão de opção
- [**Switch**](./switch) - Interruptor
- [**Slider**](./slider) - Controle deslizante

### Navigation
Componentes para navegação e estruturação:

- [**NavBar**](./navbar) - Barra de navegação
- [**SideBar**](./sidebar) - Barra lateral
- [**Breadcrumb**](./breadcrumb) - Migalhas de pão
- [**Tabs**](./tabs) - Abas de navegação
- [**Pagination**](./pagination) - Paginação

### Data Display
Componentes para exibição de dados:

- [**Table**](./table) - Tabela simples
- [**DataTable**](./data-table) - Tabela avançada com recursos
- [**Card**](./card) - Cartão de conteúdo
- [**List**](./list) - Lista de itens
- [**Avatar**](./avatar) - Avatar de usuário
- [**Badge**](./badge) - Emblema/etiqueta

### Feedback
Componentes para feedback e interação:

- [**Alert**](./alert) - Alertas e mensagens
- [**Toast**](./toast) - Notificações temporárias
- [**Modal**](./modal) - Janelas modais
- [**Tooltip**](./tooltip) - Dicas contextuais
- [**Spinner**](./spinner) - Indicador de carregamento

## Características

### ✨ Acessíveis
Todos os componentes seguem as diretrizes WCAG para garantir acessibilidade.

### 📦 TypeScript
Supporte completo ao TypeScript com tipagem strong.

### 🎨 Customizáveis
Componentes altamente customizáveis através de props e slots.

### 🚀 Performance
Otimizados para performance com lazy loading e tree shaking.

### 📱 Responsivos
Todos os componentes são responsivos e funcionam em diferentes dispositivos.

## Como usar

### Instalação

```bash
npm install @sysvale/cuida
```

### Uso Global

```js
// main.js
import { createApp } from 'vue';
import Cuida from '@sysvale/cuida';
import '@sysvale/cuida/dist/style.css';

const app = createApp(App);
app.use(Cuida);
app.mount('#app');
```

### Uso Individual

```vue
<template>
  <cds-button variant="green" @click="handleClick">
    Clique aqui
  </cds-button>
</template>

<script setup>
import { Button } from '@sysvale/cuida';

const handleClick = () => {
  console.log('Botão clicado!');
};
</script>
```

## Próximos passos

Explore os componentes organizados por categoria ou use a busca para encontrar o que precisa. Cada componente possui:

- Documentação detalhada
- Exemplos interativos
- Lista completa de props
- Eventos disponíveis
- Guias de uso

