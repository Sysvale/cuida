# Tabs <Badge type="danger">Deprecated</Badge>

### Tabs são componentes utilizados para criar soluções de navegação internas.
---
<br>

## Quando usar:
- For necessário separar o conteúdo por abas e navergar por elas.
- Não for o caso de utilizar soluções como navbars, sidebars, cards ou links como navegação.

<br>

## Quando não usar:
- Houver muitos itens a serem mostrados como abas.
- Quando a ação de clique realizada pelo usuário o levar para outra página.

---

## Uso

```js
<CdsTabs
	variant="green"
	:tabs="items"
	:activeTab="items[1]"
	@right-click="handleRightClick"
	@tabs-change="handleTabsChange"
	@add-action="handleAddAction"
>
	<template #room-42>
		Sala de Psicologia
	</template>
	<template #room-51>
		Sala de Fisioterapia
	</template>
	<template #room-13>
		Sala de Otorrinolaringologista
	</template>
</CdsTabs>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsTabs"
	:events="cdsTabsEvents"
	with-background
>
	<template #room-42>
		Sala de Psicologia
	</template>
	<template #room-51>
		Sala de Fisioterapia
	</template>
	<template #room-13>
		Sala de Otorrinolaringologista
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="CdsTabs"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsTabs"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsTabs"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsTabs from '@/components/Tabs.vue';

const cdsTabsEvents = [
	'right-click',
	'tabs-change',
	'add-action'
];

const tabs = [
	{
		title: 'Psicologia',
		name: 'room-42',
	},
	{
		title: 'Fisioterapia',
		name: 'room-51',
	},
	{
		title: 'Otorrinolaringologista',
		name: 'room-13',
	},
];

const args = ref({
	tabs,
	activeTab: tabs[1]
});
	
</script>
