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

<PreviewBuilder
	:args
	:component="CdsCard"
	:events="cdsCardEvents"
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
</PreviewBuilder>

---

## __Card simples__
As props `title` `content` e `imageSrc` nos permitem montar um layout simples de Card utilizando apenas props. 

<br>

<CdsCard
	title="Card Title"
	content="Some quick example text to build on the card title and make up the bulk of the card's content."
/>

<br>
<br>
<br>

## __Utilizando slots__
Utilizando os slots `title`, `body`, `footer` e `extra` conseguimos criar Cards mais complexos, como o DashboardCard.  

<br>

<CdsCard>
	<template #header>45 <small>gestantes</small></template>
	<template #extra>
		<cds-badge variant="red">Alerta</cds-badge>
	</template>
	<template #body>
		Não realizam consulta há mais de 30 dias
	</template>
	<template #footer>
		<div class="d-flex justify-content-end">
			<small><strong>VER LISTA</strong></small>
		</div>
	</template>
</CdsCard>

<br>
<br>
<br>

## __Slot icon__
O Card possui um slot chamado `icon`, que pode ser utilizado para adição de ícones no Card.  

⚠️O Slot `image` tem precedência maior que o slot `icon`. Caso os dois sejam utiliados o slot `image` será exibido
e o slot `icon` será ocultado.  

<br>

<CdsCard
	:horizontal="true"
>
	<template #icon>
		<CdsFlexbox align="center" justify="center" style="background: #ecf1fe; height: 48px; width: 48px; border-radius: 8px">
			<CdsIcon name="home-outline" color="#1A55A8"/>
		</CdsFlexbox>
	</template>
	<template #header>
		<div style="font-size: 24px; margin-bottom: 4px"> 32 </div>
	</template>
	<template #body>
		UBSs com dados atualizados
	</template>
</CdsCard>

<br>
<br>
<br>

## __Prop `horizontal`__
Para layouts horizontais de Card, utilize a prop `horizontal`

<CdsCard
	imageSrc="https://images.unsplash.com/photo-1677391520535-e03e845dec33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
	:horizontal="true"
	:imageWidth="200"
	title="Card Title"
	content="Some quick example text to build on the card title and make up the bulk of the card's content."
/>

<br>

---

## Props

<APITable
	name="Card"
	section="props"
/>
<br>

## Eventos

<APITable
	name="Card"
	section="events"
/>
<br>

## Slots

<APITable
	name="Card"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsCard from '@/components/Card.vue';

const cdsCardEvents = [
	'cardClick'
];

const args = ref({
	imageWidth: 400,
	imageHeight: 200,
	clickable: false,
	horizontal: false,
	imageSrc: "https://images.unsplash.com/photo-1677391520535-e03e845dec33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
});
</script>
