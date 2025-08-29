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
/>

---

## Props

<APITable
	name="Button"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Button"
	section="events"
/>
<br />

## Slots

<APITable
	name="Button"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import CdsButton from '@/components/Button.vue';

const cdsButtonEvents = [
	'button-click'
];
</script>
