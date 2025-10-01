# Link

### Links são componentes usados ​​para navegar para outra página e podem abrir uma nova guia.
---
<br>

## Quando usar:
- For necessário navegar para outra seção ou página.
- For necessário redirecionar para um site ou documento externo.

<br>

## Quando não usar:
- For necessário executar uma ação (exemplo: salvar, editar). Nesses casos é recomendado utilizar o componente Button.

---

## Uso

```js
<CdsLink
	href="https://github.com/Sysvale/cuida"
	text="Cuida"
/>
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsLink"
	:events="cdsLinkEvents"
/>

---

## Props

<APITable
	name="CdsLink"
	section="props"
/>
<br>

## Slots

<APITable
	name="CdsLink"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsLink from '@/components/Link.vue';

const args = ref({
	href: "https://github.com/Sysvale/cuida",
	text: "Cuida",
});
</script>
