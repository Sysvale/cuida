# WebcamModal

Um componente para capturar fotos diretamente da webcam do dispositivo, ao capturar uma foto o componente emite um File.

## Quando usar

- É necessário capturar uma imagem diretamente do dispositivo do usuário, como para envio de documentos ou selfies.
- Deseja-se integrar a captura de imagens com outros fluxos do sistema sem exigir uma aplicação externa.

## Quando não usar

- Não há acesso a permissões de câmera no dispositivo do usuário (como em alguns navegadores ou ambientes com restrições).
- É necessário capturar vídeos em vez de imagens estáticas.
- A interface do usuário exige múltiplas interações modais (cascatas ou modais aninhados).

---

## Preview

<script setup>
import WebcamModal from '@/components/WebcamModal.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
  <WebcamModal />
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
  <cds-webcammodal
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