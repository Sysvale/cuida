# ActionBar

ActionBars são barras de ferramentas que podem exibir ações e informações para o usuário.

---

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
	:args
	:component="CdsActionBar"
	:events="cdsActionBarEvents"
	with-trigger
	@trigger-click="args.show = !args.show"
>
	<template #description>
		8 itens selecionados
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="CdsActionBar"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsActionBar"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsActionBar"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsActionBar from '@/components/ActionBar.vue';

const cdsActionBarEvents = [
	'click',
	'close'
];

const args = ref({
	actions: ['Button1', 'Button2']
});
</script>
