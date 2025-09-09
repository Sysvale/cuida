# Tile

### Tiles são componentes que funcionam como cards de navegação, permitindo que o usuário acesse diferentes seções ou funcionalidades de forma clara e intuitiva.
---
<br />

## Quando usar:
- For necessário destacar uma opção de navegação em um menu ou dashboard.
- Quando você deseja agrupar informações relacionadas e permitir que o usuário acesse detalhes ou uma nova seção.
- Em interfaces que exigem uma navegação visualmente organizada, como painéis de controle, listas de serviços ou categorias.


<br />

## Quando não usar:
- Quando a ação principal não é de navegação, mas sim de execução de uma tarefa específica (nesse caso, considere usar botões ou outros componentes de ação).
- Em situações onde a informação é muito simples e não justifica o uso de um card (nesse caso, considere usar Links ou IconButtons).
- Quando o espaço na interface é limitado e o uso de um Tile pode sobrecarregar visualmente o layout.

---

## Uso

```js
<CdsTile
	size="sm"
	icon="trash-outline"
>
	<template #extra>
		<CdsImage
			src="https://cidadesaudavel.com/images/CS-icon.png"
			width="20"
		/>
	</template>
</CdsTile>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsTile"
	:events
>
	<template #extra>
		<CdsImage
			src="https://cidadesaudavel.com/images/CS-icon.png"
			width="20"
		/>
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="Tile"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Tile"
	section="events"
/>
<br />

## Slots

<APITable
	name="Tile"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsTile from '@/components/Tile.vue';


const events = [
	'cdsClick'
];

const args = ref({
	size: 'sm',
	icon: 'settings-outline',
	variant: 'green',
	disabled: false,
	loading: false,
	title: 'Excluir',
});
</script>
