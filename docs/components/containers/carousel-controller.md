# CarouselController

CarouselControllers são componentes utilizados para controlar a exibição de elementos em carrosséis.

---
<br>

## Quando usar:
- Você possuir uma categoria de elementos da interface que se repetem e que podem ser exibidos em forma de carrossel.

<br>

## Quando não usar:
- Você estiver trabalhando com tabelas. Nesses casos recomendamos o uso de paginação (TODO).
- Todo o conteúdo a ser gerenciado puder ser exibido de uma só vez. Nesse caso não há necessidade de controle de páginas e do uso do componente;

---

## Uso

```js
<CdsCarouselController
	:total="12"
	:perPage="4"
	@click-back="clickBackHandler"
	@click-forward="clickForwardHandler"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsCarouselController"
	:events="cdsCarouselControllerEvents"
/>

---

## Props

<APITable
	name="CdsCarouselController"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsCarouselController"
	section="events"
/>
<br>

---

<script setup>
import { ref } from 'vue';
import CdsCarouselController from '@/components/CarouselController.vue';

const cdsCarouselControllerEvents = [
	'click-back',
	'click-forward'
];

const args = ref({
	total: 12,
	perPage: 4,
	propertyName: 'dados',
});
</script>
