# LoadingBar <Badge type="danger">Deprecated</Badge>

### LoadingBars é um componente utilizado para indicar que o progresso de uma operação ainda não foi finalizado.
---
<br>

## Quando usar:
- For necessário impedir a visualização e navegação do conteúdo de páginas enquanto houver alguma pendência de operação.

<br>

## Quando não usar:
- A visualização e navegação não puder ser interrompida.

---

## Uso

```js
<CdsLoadingBar />
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsLoadingBar"
	static
/>

---

<script setup>
import { ref } from 'vue';
import CdsLoadingBar from '@/components/LoadingBar.vue';

const args = ref({});
</script>
