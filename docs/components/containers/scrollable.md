# Scrollable

Scrollable é um componente utilizado para tornar o conteúdo envolvido "scrolável".

### Quando usar

- Se quer mostrar muito conteúdo em um espaço pequeno ou pré-definido.
- Para contrôlar a altura máxima de containers com conteúdo variável.

### Quando não usar

- Houver pouco conteúdo que não ultrapassa o espaço disponível.
- Já houver um outro scrollable aninhado.

---

## Uso

```js
<CdsScrollable
	maxHeight="150px"
>
	<p>Conteúdo que pode ser scrollado...</p>
	<p>Mais conteúdo...</p>
</CdsScrollable>
```

---

## Preview

<PreviewContainer
	:component="CdsScrollable"
	:events="cdsScrollableEvents"
/>

---

## Props

<APITable
	name="Scrollable"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Scrollable"
	section="events"
/>
<br />

## Slots

<APITable
	name="Scrollable"
	section="slots"
/>

---


<script setup>
import { ref } from 'vue';
import CdsScrollable from '@/components/Scrollable.vue';

const cdsScrollableEvents = [];
</script>
