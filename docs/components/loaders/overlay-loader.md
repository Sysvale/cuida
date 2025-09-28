# OverlayLoader

### OverlayLoader é utilizado para indicar o carregamento de componentes internos de páginas, como cards e gráficos.
---
<br>

## Quando usar:
- Para indicar o carregamento de elementos de página que ainda não possuam skeleton implementado.

<br>

## Quando não usar:
- Não utilize o OverlayLoader para carregamento de páginas. Nesses casos prefira o Spinner.
- Não utilize o OverlayLoader para indicar carregameto de componentes que possuam skeletons implementados

---

## Uso

```js
<CdsOverlayLoader
	variant="green"
	size="md"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsOverlayLoader"
/>

---

## Props

<APITable
	name="OverlayLoader"
	section="props"
/>
<br>

---

<script setup>
import { ref } from 'vue';
import CdsOverlayLoader from '@/components/OverlayLoader.vue';

const args = ref({});
</script>
