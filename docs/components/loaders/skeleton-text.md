# Skeleton Text <Badge type="danger">Deprecated</Badge>

### Skeleton texts permitem exibir um estado de carregamento para vários tipos de componentes
### enquanto seus dados estão sendo buscados.
---
<br />

## Quando usar:
- Informar ao usuário que as informações do componentes estão sendo carregadas.
- O conteúdo a ser carregado for dinâmico.

<br />

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
  :width="100"
/>

---

## Props

<APITable
	name="SkeletonText"
	section="props"
/>
<br />


---


<script setup>
import CdsSkeletonText from '@/components/SkeletonText.vue';
</script>
