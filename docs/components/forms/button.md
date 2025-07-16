# Button

Buttons são componentes clicáveis e que indicam ao usuário que ele pode realizar uma ação ao interagir com ele.

## Quando usar

- For necessário comunicar ao usuário que ele pode executar uma ação na interface,
seja em dialogs, modais, formulários, cards, etc.

## Quando não usar

- Não utilize botões com apenas ícone. Para esses casos de uso recomenda-se utilizar o IconButton.
- Em redirecionamentos para páginas externas. Nesses casos utilize links.

## Preview

<script setup>
import Button from '@/components/Button.vue';

const handleClick = () => {
  console.log('Component interaction');
};
</script>

<div class="demo-container">
	<Button />
</div>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `green` | A variante de cor. São 9 variantes implementadas: 'green', 'teal', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange' e 'amber'. |
| `size` | `string` | `md` | Especifica o tamanho do botão. São 3 tamanhos implementados: 'sm', 'md', 'lg'. |
| `prop` | `string` | `''` | Description |
| `prop` | `string` | `''` | Description |

## Eventos

| Event | Description |
|-------|-------------|
| `event` | Event description |

## Uso

```vue
<template>
	<CdsButton
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