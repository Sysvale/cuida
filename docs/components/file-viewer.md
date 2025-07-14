# FileViewer

 FileViewer é um componente que permite pré-visualizar ou fazer download de um arquivo.

## Quando usar

- Quando for necessário apresentar uma imagem ao usuário, possibilitando que ele visualize sem a necessidade de baixá-la.
- Quando for necessário apresentar um arquivo ao usuário e permitir que ele faça o download.
- Para apresentar pré-visualizações de arquivos de imagem antes de baixar.
- Quando o usuário precisa revisar rapidamente um arquivo sem abrir um aplicativo separado.

## Quando não usar

- Quando for mais conveniente para o usuário ver a imagem diretamente sem precisar clicar no componente. Nesse caso, use o componente Image.
- Quando o conteúdo não necessita de interatividade, como um ícone simples ou uma miniatura sem funcionalidade adicional.
- Para arquivos muito grandes que podem demorar para carregar na pré-visualização. Nesse caso, forneça apenas a opção de download.
- Quando a pré-visualização pode comprometer a segurança ou privacidade dos dados contidos no arquivo.

## Preview

<script setup>
import FileViewer from '@/components/FileViewer.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <FileViewer />
</div>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prop` | `string` | `''` | Description |

## Eventos

| Event | Description |
|-------|-------------|
| `event` | Event description |

## Uso

```vue
<template>
  <cds-fileviewer
    prop="value"
    @event="handleEvent"
  />
</template>

<script setup>
const handleEvent = () => {
  console.log('Event handled');
};
</script>
```

<style scoped>
.demo-container {
  padding: 20px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  margin: 16px 0;
}
</style>