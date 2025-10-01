# Truncate

Componente auxiliar utilizado para truncar texto adicionando a ele reticências

---

## Uso

```js
<CdsTruncate
	width="200"
>
	Texto longo para testar o truncate
</CdsTruncate>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsTruncate"
  width="200"
>
  Texto longo para testar o truncate
</PreviewBuilder>

---

## Props

<APITable
	name="CdsTruncate"
	section="props"
/>
<br>

## Slots

<APITable
	name="CdsTruncate"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsTruncate from '@/components/Truncate.vue';

const args = ref({});
</script>
