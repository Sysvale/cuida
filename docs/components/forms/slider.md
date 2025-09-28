# Slider

### Sliders são componentes utilizados para seleção de valores dentro de um intervalo.
---
<br>

## Quando usar:
- Recomendamos o uso de sliders quando for preciso a seleção de valores dentro de um intervalo,
sobretudo quando for preciso selecionar mais de um valor.
- Recomendamos o uso de sliders quando a velocidade na seleção de valores em um intervalo for
mais relevante que a precisão.

<br>

## Quando não usar:
- Não recomendamos o uso de sliders quando não houver necessidade de uma precisão muito grande na seleção dos valores.
- Não recomendamos o uso de sliders em conjunto com inputs para que o usuário consiga editar
o dado tanto pelo slider quanto pelos inputs.

## Observações:
- O slider do Cuida é um wrapper do <a target="_blank" href="https://nightcatsama.github.io/vue-slider-component/#/">Vue slider component</a>
com a sua adequação aos nossos princípios e recomendações. Para informações detalhadas do componente, recomendamos
leitura da documentação.

---

## Uso

```js
<CdsSlider
	:min="0"
	:max="100"
	:value="value"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:events
	:component="CdsSlider"
/>

---

## Props

<APITable
	name="Slider"
	section="props"
/>
<br>

## Eventos

<APITable
	name="Slider"
	section="events"
/>
<br>

## Slots

<APITable
	name="Slider"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsSlider from '@/components/Slider.vue';

const events = [
	'update:modelValue'
];

const args = ref({
	modelValue: [20, 60],
	min: 0,
	max: 100,
});
</script>
