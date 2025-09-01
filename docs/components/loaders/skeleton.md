# Skeleton

### O componente Skeleton é usado para criar espaços reservados que representam conteúdo que está carregando ou sendo processado.
### Ele é útil para melhorar a experiência do usuário, fornecendo feedback visual enquanto o conteúdo real está sendo carregado.
---
<br />

## Quando usar:
- Use o componente Skeleton quando o carregamento de conteúdo for perceptível
para o usuário e você deseja fornecer feedback visual durante esse processo.
- É especialmente útil em situações onde o tempo de carregamento do conteúdo é
variável ou pode levar algum tempo para ser concluído.

<br />

## Quando não usar:
- Evite usar o componente Skeleton quando o conteúdo é carregado
instantaneamente, pois pode causar distração ou poluição visual desnecessária.
- Não use quando o feedback visual do carregamento não for relevante para a
experiência do usuário ou quando o carregamento é rápido e não perceptível.


## Observações
- Personalize as propriedades do skeleton conforme necessário para corresponder
ao layout e estilo do seu aplicativo.
- O componente suporta formas de 'circle' e 'square' e pode ser dimensionado
dinamicamente para se adaptar ao conteúdo ou à largura disponível.

---

## Uso

```js
<CdsSkeleton
	:width="100"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsSkeleton"
	:width="100"
/>

---

## Props

<APITable
	name="Skeleton"
	section="props"
/>
<br />

---

<script setup>
import CdsSkeleton from '@/components/Skeleton.vue';
</script>
