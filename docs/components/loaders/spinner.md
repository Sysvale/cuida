# Spinner

### Spinners é um componente utilizado para indicar que o progresso de uma operação ainda não foi finalizado.
---
<br />

## Quando usar:
- For necessário impedir a visualização e navegação do conteúdo de páginas enquanto houver alguma pendência de operação.

<br />

## Quando não usar:
- A visualização e navegação não puder ser interrompida.

---

## Uso

```js
<CdsSpinner
	variant="green"
	size="md"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsSpinner"
	:delay="1000"
/>

---

## Props

<APITable
	name="Spinner"
	section="props"
/>
<br />

---

<script setup>
import CdsSpinner from '@/components/Spinner.vue';
</script>
