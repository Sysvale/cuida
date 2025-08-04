# Button

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
<CdsButton
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="buttonClick = true"
/>
```

---

## Preview

<DemoContainer
	:component="CdsButton"
	:events="cdsButtonEvents"
	:component-props="buttonProps"
	:log
/>

<PlaygroundBuilder component="Button" @update="handleUpdate"/>

---

## Props

<PropsDoc name="Button" />
<br />

## Eventos

<EventsDoc name="Button" />
<br />

## Slots

<SlotsDoc name="Button" />

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsButton from '@/components/Button.vue';
import PropsDoc from '../../docgen/PropsDoc.vue';
import EventsDoc from '../../docgen/EventsDoc.vue';
import SlotsDoc from '../../docgen/SlotsDoc.vue';
import DemoContainer from '../../docgen/DemoContainer.vue';
import PlaygroundBuilder from '../../docgen/PlaygroundBuilder.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

const buttonProps = ref({});
const log = ref([]);

const cdsButtonEvents = {
	'button-click': (ev) => {
		log.value.push(
			{
				event: 'button-click',
				payload: ev,
				timestamp: new Date().toTimeString().split(' ')[0]
			}
		);
	}
}

function handleUpdate (payload) {
	buttonProps.value = payload;
};
</script>
