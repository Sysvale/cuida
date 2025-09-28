# TruncateContainer

### TruncateContainer é um componente utilizado para controlar a visibilidade de conteúdos longos.
---
<br>

## Quando usar:
- Quando o conteúdo pode ser muito grande e você quer limitar a altura inicial.
- Para indicar visualmente que há mais conteúdo disponível para leitura.


<br>

## Quando não usar:
- Quando todo o conteúdo precisa estar visível imediatamente.
- Se não houver necessidade de interação do usuário para expandir o conteúdo.

---

## Uso

```js
<CdsTruncateContainer
	height="250px"
	text-align="center"
	variant="dark"
>
	<ul>
		<li v-for="n in 25">List Item {{n}}</li>
	</ul>
</CdsTruncateContainer>
```

---

## Preview

<PreviewContainer>
	<CdsTruncateContainer
		v-bind="args"
		v-on="internalEvents"
	>
		<ul>
			<li v-for="n in 25">List Item {{n}}</li>
		</ul>
	</CdsTruncateContainer>
	<LogBuilder ref="logBuilderRef" :events />
</PreviewContainer>

<PlaygroundBuilder
	:args
	component="TruncateContainer"
/>

---

## Props

<APITable
	name="TruncateContainer"
	section="props"
/>
<br>

## Events

<APITable
	name="TruncateContainer"
	section="events"
/>

<br>
## Slots

<APITable
	name="TruncateContainer"
	section="slots"
/>

---

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';
import CdsTruncateContainer from '@/components/TruncateContainer.vue';

const logBuilder = useTemplateRef('logBuilderRef');

const events = [
	'button-click',
	'expand',
	'collapse'
];

const internalEvents = ref({});

const args = ref({
	variant: 'dark',
	textAlign: 'center',
	height: '250',
});

onMounted(() => {
	internalEvents.value = logBuilder.value.createEventListeners();
});
</script>

