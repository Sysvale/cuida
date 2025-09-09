# Chevron

### Chevrons são elementos gráficos usados em interfaces para indicar possibilidade de interação.
---
<br />

## Quando usar:
- Parte de um elemento pode ser oculta o visível,
- Indicar ações como `play`, `next` e `fastfoward`


<br />

## Quando não usar:
- Como ícones.
- Evite usar chevrons sem a propriedade `animate` ativa

---

## Uso

```js
<CdsChevron />
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsChevron"
/>

---

## Props

<APITable
	name="Chevron"
	section="props"
/>
<br />

<script setup>
import { ref } from 'vue';
import CdsChevron from '@/components/Chevron.vue';

const args = ref({});
</script>
