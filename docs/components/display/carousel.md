# Carousel

### O Carousel é um componente que permite a exibição de uma série de conteúdos (imagens, textos, cards, etc.) em um formato deslizante, em que o usuário pode navegar entre os itens de forma sequencial.
---
<br>

## Quando usar:
- Quando há necessidade de exibir vários itens (como imagens, produtos, cards informativos) em um espaço reduzido, sem sobrecarregar a interface.
- Para destacar conteúdos importantes de forma dinâmica, como promoções, destaques ou novidades.
- Quando a ordem de exibição dos itens é relevante e a navegação sequencial faz sentido para o contexto.

<br>

## Quando não usar:
- Quando o conteúdo for uma informação crítica e não deve ficar escondida.
- Se a quantidade de itens for muito pequena (menos de 3), pois a navegação pode parecer desnecessária.
- Em interfaces onde a acessibilidade é uma prioridade e o carousel pode dificultar a experiência para usuários com deficiências visuais ou motoras.
- Quando o espaço disponível na tela é insuficiente para exibir os itens de forma clara e legível.

<br>

## Obs:
- Quando o carrossel for utilizado para exibir imagens, é recomendado usar o componente `Image` em vez da tag `<img>` nativa. Isso permite que todas as funcionalidades do <b>Image</b>, como <i>dimmed</i> e <i>opacity</i>, sejam utilizadas.

<br>

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
	:args
	component="CdsCarousel"
	v-slot="{ item }"
	:events
>
	<CdsImage :src="item" width="300" height="400" />
</PreviewBuilder>

---

## Props

<APITable
	name="CdsCarousel"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsCarousel"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsCarousel"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsCarousel from '@/components/Carousel.vue';

const events = [
	'item-click'
];

const args = ref({
	items: [
		'https://picsum.photos/600/800?random=1',
		'https://picsum.photos/600/800?random=2',
		'https://picsum.photos/600/800?random=3',
		'https://picsum.photos/600/800?random=4',
		'https://picsum.photos/600/800?random=5',
		'https://picsum.photos/600/800?random=6',
		'https://picsum.photos/600/800?random=7',
	],
	gap: 0,
	snapTo: 'start',
	showArrows: false,
	darkArrows: false,
	clickable: false,
});
</script>
