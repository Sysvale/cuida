# Link

### Links são componentes usados ​​para navegar para outra página e podem abrir uma nova guia.
---
<br />

## Quando usar:
- For necessário navegar para outra seção ou página.
- For necessário redirecionar para um site ou documento externo.

<br />

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

<PreviewContainer
	:component="CdsLink"
	:events="cdsLinkEvents"
	href="https://github.com/Sysvale/cuida"
	text="Cuida"
/>

---

## Props

<APITable
	name="Link"
	section="props"
/>
<br />

## Slots

<APITable
	name="Link"
	section="slots"
/>

<script setup>
import CdsLink from '@/components/Link.vue';
</script>
