# Skeleton Text <Badge type="danger">Deprecated</Badge>

Skeleton texts permitem exibir um estado de carregamento para vários tipos de componentes

---
<br>

## Quando usar:
- Informar ao usuário que as informações do componentes estão sendo carregadas.
- O conteúdo a ser carregado for dinâmico.

<br>

## Quando não usar:
- O conteúdo a ser carregado for estático.

## Observações
- O Skeleton text deve ser ajustado de acordo com o componente a ser utilizado.

---

## Uso

```js
<CdsSkeletonText
	:width="100"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsSkeletonText"
/>

---

## Props

<APITable
	name="CdsSkeletonText"
	section="props"
/>
<br>

---

<script setup>
import { ref } from 'vue';
import CdsSkeletonText from '@/components/SkeletonText.vue';

const args = ref({
	width: 100
});
</script>
