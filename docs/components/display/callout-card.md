# CalloutCard
### CalloutCards são componentes usados para fornecer ao usuário informações úteis, como tutoriais, atalhos ou dicas.
---
<br>

## Quando usar:
- For necessário mostrar atalhos, dicas ou tutoriais de uma forma não intrusiva e visualmente marcante.

<br>

## Quando não usar:
- For necessário mostrar mensagens relacionadas a mudanças ou condições especiais que ocorrem em um componente ou página. Para estes casos, recomenda-se o uso do Alert.

---

## Uso

```js
<CdsCalloutCard
	image="caminho-da-imagem.jpg"
	text="Texto do CalloutCard"
	title="Título do CalloutCard"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsCalloutCard"
	:events
/>

---

## Props

<APITable
	name="CalloutCard"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CalloutCard"
	section="events"
/>
<br>

## Slots

<APITable
	name="CalloutCard"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsCalloutCard from '@/components/CalloutCard.vue';

const events = [
	'action-button-click'
];

const args = ref({
	image: 'https://cdn-icons-png.flaticon.com/512/7486/7486747.png',
	title: 'Título do CalloutCard',
	text: `Existe uma teoria que diz que, se um dia alguém descobrir 
	exatamente para que serve o Universo e por que ele está aqui, ele 
	desaparecerá instantaneamente.`,
});
</script>
