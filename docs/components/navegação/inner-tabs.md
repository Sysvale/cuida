# InnerTabs

### InnerTabs são componentes utilizados para criar soluções de navegação interas às Tabs
---
<br />

## Quando usar:
- Dentro de tabs, houver necessidade de mais um nível na estrutura de navegação;
- Em casos que for muito importante mostrar todo o título das abas;
- For necessário separar o conteúdo por abas e navergar por elas;
- Não for o caso de utilizar soluções como navbars, sidebars, cards ou links como navegação;

<br />

## Quando não usar:
- Houver muitos itens a serem mostrados como abas.
- Quando a ação de clique realizada pelo usuário o levar para outra página.

---

## Uso

```js
<CdsInnerTabs
	variant="green"
	:tabs="dataSet"
	:activeTab="dataSet[1]"
	:lazy="false"
	:headerLeft="false"
>
	<template #overview>
		Overview
	</template>
	<template #indicator-1>
		Conteúdo da tab-1
	</template>
	<template #prision-tab>
		Você não pode sair dessa aba pois a propriedade "disableTabChange" está com o valor "true" neste item na propriedade "tabs"
	</template>
	<template #indicator-3>
		Conteúdo da tab-3
	</template>
	<template #indicator-4>
		Conteúdo da tab-4
	</template>
	<template #indicator-5>
		Conteúdo da tab-5
	</template>
	<template #indicator-6>
		Conteúdo da tab-6
	</template>
	<template #indicator-7>
		Conteúdo da tab-7
	</template>
	<template #indicator-8>
		Conteúdo da tab-8
	</template>
</CdsInnerTabs>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsInnerTabs"
	:events="cdsInnerTabsEvents"
	with-background
>
	<template #overview>
		Overview
	</template>
	<template #indicator-1>
		Conteúdo da tab-1
	</template>
	<template #prision-tab>
		Você não pode sair dessa aba pois a propriedade "disableTabChange" está com o valor "true" neste item na propriedade "tabs"
	</template>
	<template #indicator-3>
		Conteúdo da tab-3
	</template>
	<template #indicator-4>
		Conteúdo da tab-4
	</template>
	<template #indicator-5>
		Conteúdo da tab-5
	</template>
	<template #indicator-6>
		Conteúdo da tab-6
	</template>
	<template #indicator-7>
		Conteúdo da tab-7
	</template>
	<template #indicator-8>
		Conteúdo da tab-8
	</template>
</PreviewBuilder>

---

## __Com scroll horizontal__
Quando o conjunto de abas tiver uma largura maior que o container, será exibida uma barra de scroll horizonal para que o layout não seja quebrado em linhas ou fique oculto.

<PreviewContainer withBackground>
	<CdsInnerTabs
		:tabs="tabs2"
		:activeTab="tabs2[1]"
		:lazy="false"
		:headerLeft="false"
	>
		<template #overview>
			Overview
		</template>
		<template #indicator-1>
			Conteúdo da tab-1
		</template>
		<template #prision-tab>
			Você não pode sair dessa aba pois a propriedade "disableTabChange" está com o valor "true" neste item na propriedade "tabs"
		</template>
		<template #indicator-3>
			Conteúdo da tab-3
		</template>
		<template #indicator-4>
			Conteúdo da tab-4
		</template>
		<template #indicator-5>
			Conteúdo da tab-5
		</template>
		<template #indicator-6>
			Conteúdo da tab-6
		</template>
		<template #indicator-7>
			Conteúdo da tab-7
		</template>
		<template #indicator-8>
			Conteúdo da tab-8
		</template>
	</CdsInnerTabs>
</PreviewContainer>

---

## Props

<APITable
	name="InnerTabs"
	section="props"
/>
<br />

## Eventos

<APITable
	name="InnerTabs"
	section="events"
/>
<br />

## Slots

<APITable
	name="InnerTabs"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsInnerTabs from '@/components/InnerTabs.vue';

const cdsInnerTabsEvents = [
	'tab-click',
	'change'
];

const tabs = [
	{
		title: 'Visão geral',
		name: 'overview',
	},
	{
		title: 'Indicador 1',
		name: 'indicator-1',
	},
	{
		title: 'Aba Prisão',
		name: 'prision-tab',
		disableTabChange: true,
	},
	{
		title: 'Indicador 3',
		name: 'indicator-3',
	},
	{
		title: 'Indicador 4',
		name: 'indicator-4',
	}
];

const tabs2 = [
	{
		title: 'Visão geral',
		name: 'overview',
	},
	{
		title: 'Indicador 1',
		name: 'indicator-1',
	},
	{
		title: 'Indicador 2',
		name: 'indicator-2',
	},
	{
		title: 'Indicador 3',
		name: 'indicator-3',
	},
	{
		title: 'Indicador 4',
		name: 'indicator-4',
	},
	{
		title: 'Indicador 5',
		name: 'indicator-5',
	},
	{
		title: 'Indicador com o nome absurdamente grande 6',
		name: 'indicator-6',
	},
	{
		title: 'Indicador 7',
		name: 'indicator-7',
	},
	{
		title: 'Indicador 8',
		name: 'indicator-8',
	},
];

const args = ref({
	tabs,
	activeTab: tabs[1],
	lazy: false,
	headerLeft: false,
});
</script>
