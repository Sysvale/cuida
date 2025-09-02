# ActionBar

ActionBars são barras de ferramentas que podem exibir ações e informações para o usuário.

## Quando usar

- Par agrupar ações que o usuário pode tomar sobre itens de uma lista ou tabela.
- Não houver espaço nos menus e em outros locais para exibir ações e informações.

## Quando não usar

- Para exibir os status do sistema.
- Em modo flutuante, a ActionBar ocultar permanentemente informações na tela.


---

## Uso

```js
<CdsActionBar
	:actions="['Button1', 'Button2']"
	:show="showActionBar"
	@click="logAction"
	@close="logClose"
>
	<template #description>
		8 itens selecionados
	</template>
</CdsActionBar>
```
---

## Preview

<PreviewBuilder
	:component="CdsActionBar"
	:events="cdsActionBarEvents"
	with-trigger
	:show
	:actions="['Button1', 'Button2']"
	@trigger-click="show = !show"
>
	<template #description>
		8 itens selecionados
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="ActionBar"
	section="props"
/>
<br />

## Eventos

<APITable
	name="ActionBar"
	section="events"
/>
<br />

## Slots

<APITable
	name="ActionBar"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsActionBar from '@/components/ActionBar.vue';

const show = ref(false);

const cdsActionBarEvents = [
	'click',
	'close'
];
</script>
