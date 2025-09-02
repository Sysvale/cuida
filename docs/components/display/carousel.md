# Carousel

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
<CdsCarousel
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="carouselClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsCarousel"
	:events="cdsCarouselEvents"
/>

---

## Props

<APITable
	name="Carousel"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Carousel"
	section="events"
/>
<br />

## Slots

<APITable
	name="Carousel"
	section="slots"
/>

<script setup>
import CdsCarousel from '@/components/Carousel.vue';

const cdsCarouselEvents = [
	'carousel-click'
];
</script>
