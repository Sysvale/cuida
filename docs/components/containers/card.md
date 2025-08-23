# Card

Cards são componentes utilizados como containers de propósito geral. À partir das suas props e slots `header`, `body`, `footer`, `image`, `icon` e `extra` é possível criar variações e cards mais específicos, como o DashboardCard.

### Quando usar

- Para agrupar elementos relacionados entre si.
- Para dar proeminência visual a elementos relacionados entre si.

### Quando não usar

- De modo aninhado, com cards dentro de cards.
- Quando o conteúdo encapsulado pelo card ocupar mais da metade da página.

### Observações

- As props `title` `content` e `imageSrc` nos permitem montar um layout simples de Card utilizando apenas props.
- O slot `image` tem precedência maior que o slot `icon`. Caso os dois sejam utilizados o slot `image` será exibido e o slot `icon` será ocultado.
- Para layouts horizontais de Card, utilize a prop `horizontal`.

---

## Uso

```js
<CdsCard
	imageWidth="300"
	imageHeight="180"
	imageSrc="https://images.unsplash.com/photo-1677391520535-e03e845dec33"
	@cardClick="logClick"
>
	<template #header>
		<div style="margin-bottom: 12px">
			Card Title
		</div>
	</template>
	<template #extra>
		<CdsBadge>Action</CdsBadge>
	</template>
	<template #body>
		Some quick example text to build on the card title and make up the bulk of the card's content.
	</template>
	<template #footer>
		<CdsButton size="md" style="margin-top: 16px">
			Action 1
		</CdsButton>
	</template>
</CdsCard>
```

---

## Preview

<DemoContainer
	:component="CdsCard"
	:events="cdsCardEvents"
	:imageWidth="400"
	:imageHeight="200"
	:clickable="false"
	:horizontal="false"
	imageSrc="https://images.unsplash.com/photo-1677391520535-e03e845dec33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
>
	<template #header>
		<div style="margin-bottom: 12px">
			Card Title
		</div>
	</template>
	<template #extra>
		<CdsBadge>Action</CdsBadge>
	</template>
	<template #body>
		Some quick example text to build on the card title and make up the bulk of the card's content.
	</template>
	<template #footer>
		<CdsButton size="md" style="margin-top: 16px">
			Action 1
		</CdsButton>
	</template>
</DemoContainer>

---

## Props

<APITable
	name="Card"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Card"
	section="events"
/>
<br />

## Slots

<APITable
	name="Card"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsCard from '@/components/Card.vue';

const cdsCardEvents = [
	'cardClick'
];
</script>
