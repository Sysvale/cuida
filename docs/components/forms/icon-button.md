# IconButton

IconButtons são componentes que permitem que o usuário execute uma ação com um toque.

### Quando usar

- For necessário comunicar ao usuário que ele pode executar uma ação na interface, seja em diálogos, janelas modais, formulários, cards, etc.

### Quando não usar

- For necessário dar a opção de executar uma ação como um detalhe pequeno na interface. Nesse caso, recomendamos o uso de links.

---

## Uso

```js
<CdsIconButton
	size="sm"
	icon="trash-outline"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsIconButton"
	:events="cdsIconButtonEvents"
/>

---

## Props

<APITable
	name="IconButton"
	section="props"
/>
<br />

## Eventos

<APITable
	name="IconButton"
	section="events"
/>
<br />

## Slots

<APITable
	name="IconButton"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsIconButton from '@/components/IconButton.vue';

const cdsIconButtonEvents = [
	'cds-click'
];
</script>
