# Slider

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
<CdsSlider
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="sliderClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsSlider"
	:events="cdsSliderEvents"
/>

---

## Props

<APITable
	name="Slider"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Slider"
	section="events"
/>
<br />

## Slots

<APITable
	name="Slider"
	section="slots"
/>

<script setup>
import CdsSlider from '@/components/Slider.vue';

const cdsSliderEvents = [
	'slider-click'
];
</script>
