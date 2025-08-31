# Breadcrumb

Buttons são componentes clicáveis e que indicam ao usuário que ele pode realizar uma ação ao interagir com ele.

### Quando usar

- For necessário comunicar ao usuário que ele pode executar uma ação na interface,
  seja em dialogs, modais, formulários, cards, etc.

### Quando não usar

- Não utilize botões com apenas ícone. Para esses casos de uso recomenda-se utilizar o IconButton.
- Em redirecionamentos para páginas externas. Nesses casos utilize links.

---

## Uso

```js
<CdsBreadcrumb
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="breadcrumbClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsBreadcrumb"
	:events="cdsBreadcrumbEvents"
/>

---

## Props

<APITable
	name="Breadcrumb"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Breadcrumb"
	section="events"
/>
<br />

## Slots

<APITable
	name="Breadcrumb"
	section="slots"
/>

<script setup>
import CdsBreadcrumb from '@/components/Breadcrumb.vue';

const cdsBreadcrumbEvents = [
	'breadcrumb-click'
];
</script>
