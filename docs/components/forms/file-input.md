# FileInput

### FileInput é um input customizado de arquivos.
---
<br>

## Quando usar:
- For necessário que o usuário faça uploads do seu computador para a plataforma.
- For necessário prover uma experiência de arrasta e solta para upload de arquivos.

<br>

## Quando não usar:
- Se tratar de uma experiência mobile-first.


---

## Uso

```js
<CdsFileInput
	v-model="args"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsFileInput"
	:events
/>

---

## Props

<APITable
	name="FileInput"
	section="props"
/>
<br>

## Eventos

<APITable
	name="FileInput"
	section="events"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsFileInput from '@/components/FileInput.vue';

const events = [
	'update:modelValue'
];

const args = ref({});
</script>
