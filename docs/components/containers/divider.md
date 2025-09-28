# Divider

### Dividers são componentes utilizados para separar ou agrupar conteúdo.
---
<br>

## Obs.:
- A prop `vertical` ocualta o texto do divider.

<br>

---

## Uso

```js
<CdsDivider />
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsDivider"
/>

---

## Props

<APITable
	name="Divider"
	section="props"
/>
<br>

---

<script setup>
import { ref } from 'vue';
import CdsDivider from '@/components/Divider.vue';

const args = ref({});
</script>
