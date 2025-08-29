# FlatButton

FlatButtons são componentes semelhantes a links, mas que funcionam como botões.

### Quando usar

- Componente usado quando a interface necessita de botões menos proeminentes, sem compromenter a hierarquia visual da tela.

### Quando não usar

- For necessário dar a opção de executar uma ação como um detalhe pequeno na interface.

---

## Uso

```js
<CdsFlatButton
	variant="green"
	text="Link Button"
/>
```

---

## Preview

<DemoContainer
	:component="CdsFlatButton"
	:events="cdsFlatButtonEvents"
/>

---

## Props

<APITable
	name="FlatButton"
	section="props"
/>
<br />

## Eventos

<APITable
	name="FlatButton"
	section="events"
/>
<br />

## Slots

<APITable
	name="FlatButton"
	section="slots"
/>

---

<!-- ## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/> -->

<script setup>
import { ref } from 'vue';
import CdsFlatButton from '@/components/FlatButton.vue';

const cdsFlatButtonEvents = [
	'click'
];
</script>
