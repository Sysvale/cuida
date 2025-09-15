# Componentes

Acesse os componentes ao lado ou buque por algum em específico com `Ctrl + K`.

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
  <CdsButton variant="green" @click="handleClick">
    Clique aqui
  </CdsButton>
</template>

<script setup>
const handleClick = () => {
  console.log('Botão clicado!');
};
</script>
```
