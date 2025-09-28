# TopAppBar

### O TopAppBar é um componente de barra de aplicação responsivo que pode exibir um título, um logotipo, um botão de menu e ações personalizadas.
---
<br>

## Quando usar:
- Quando for necessário um cabeçalho fixo e responsivo para a aplicação.
- Quando houver necessidade de um botão de menu ou de navegação para melhorar a experiência do usuário.
- Quando for necessário exibir um logotipo ou título na parte superior da interface.
- Quando houver ações que precisam estar sempre acessíveis na barra superior.

<br>

## Quando não usar:
- Quando a aplicação não precisa de uma barra de navegação fixa.
- Quando a interface já possui outra estrutura de navegação redundante.
- Quando o espaço na tela é muito limitado e um cabeçalho fixo pode comprometer a usabilidade.


---

## Uso

```js
<CdsTopAppBar
	:elevated="false"
>
	2
</CdsTopAppBar>
```

---

## Preview

<PreviewContainer>
	<div style="position: relative">
		<img
			src="https://images.unsplash.com/photo-1738526787238-96d5352c2ba9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			style="width: 100%; height: 100%;"
		/>
		<CdsTopAppBar
			v-bind="args"
			v-on="internalEvents"
		/>
	</div>
	<LogBuilder ref="logBuilderRef" :events />
</PreviewContainer>

<PlaygroundBuilder
	:args
	component="TopAppBar"
/>

---

## Props

<APITable
	name="TopAppBar"
	section="props"
/>
<br>

## Eventos

<APITable
	name="TopAppBar"
	section="events"
/>
<br>

## Slots

<APITable
	name="TopAppBar"
	section="slots"
/>


<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';
import CdsTopAppBar from '@/components/TopAppBar.vue';

const logBuilder = useTemplateRef('logBuilderRef');

const events = [
	'on-menu-click'
];

const internalEvents = ref({});

const args = ref({
	title: 'Título bacana',
	logoUrl: 'https://framerusercontent.com/images/xz7CrU73qctPY2Vm79XMnTAVM.svg',
	showMenuIcon: true,
	showBackNavigation: false,
	defaultRoute: { name: 'rota-default' },
});

onMounted(() => {
	internalEvents.value = logBuilder.value.createEventListeners();
});
</script>
