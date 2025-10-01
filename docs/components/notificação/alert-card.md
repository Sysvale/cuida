# AlertCard

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
<CdsAlertCard
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="alertCardClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsAlertCard"
/>

---

## Props

<APITable
	name="CdsAlertCard"
	section="props"
/>
<br>

## Slots

<APITable
	name="CdsAlertCard"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsAlertCard from '@/components/AlertCard.vue';

const args = ref({});
</script>
