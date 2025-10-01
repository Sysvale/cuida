# IconButton

### IconButtons são componentes que permitem que o usuário execute uma ação com um toque.
---
<br>

## Quando usar:
- For necessário comunicar ao usuário que ele pode executar uma ação na interface,
seja em diálogos, janelas modais, formulários, cards, etc.


<br>

## Quando não usar:
- For necessário dar a opção de executar uma ação como um detalhe pequeno na interface.
Nesse caso, recomendamos o uso de links.

<br>

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

<PreviewBuilder
	:args
	:component="CdsIconButton"
	:events
/>

---

## Props

<APITable
	name="CdsIconButton"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsIconButton"
	section="events"
/>
<br>

---
<script setup>
import { ref } from 'vue';
import CdsIconButton from '@/components/IconButton.vue';

const events = [
	'cds-click'
];

const args = ref({
	size: 'sm',
	icon: 'trash-outline',
	variant: 'white',
	tooltipText: 'Excluir',
	disabled: false,
	feedbackOnClick: true,
	feedbackIcon: 'check-outline',
});
</script>
