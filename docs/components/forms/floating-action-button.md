# FloatingActionButton (FAB)

### O FloatingActionButton é um botão que flutua sobre a interface do usuário, sempre visível, usado para promover uma ação primária ou frequente em um aplicativo.
---
<br>

## Quando usar:
- Para destacar a ação principal ou mais importante em uma tela.
- Em aplicações móveis ou responsivas onde é necessário um acesso rápido a uma funcionalidade específica.
- Quando a interface precisa de um elemento de ação que seja altamente visível e de fácil acesso.
- Em telas onde o espaço é limitado e um botão tradicional ocuparia muito espaço ou distrairia o usuário.

<br>

## Quando não usar:
- Quando há múltiplas ações principais com a mesma importância, pois o FAB é destinado a uma única ação primária.
- Em telas onde a ação não é crítica ou não é frequentemente utilizada pelo usuário.
- Em interfaces que já possuem muitos elementos flutuantes ou sobrepostos, para evitar poluição visual.
- Em telas grandes (desktop), onde um botão tradicional ou outro componente de interface pode ser mais apropriado.

---

## Uso

```js
<CdsFloatingActionButton
	icon="plus-outline"
	size="md"
	variant="green"
	:actions="[
		{
			icon: 'document-outline',
			label: 'Documentos',
		},
		{
			icon: 'home-outline',
			label: 'Início',
		},
		{
			icon: 'edit-outline',
			label: 'Editar',
		}
	]"
/>
```

---

## Preview

### Dois botões na mesma tela

<PreviewContainer>
	<div style="position: relative">
		<img
			src="https://images.unsplash.com/photo-1738526787238-96d5352c2ba9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			style="width: 100%; height: 100%;"
		/>
		<div
			style="position: absolute; bottom: 0; right: 0; margin-bottom: 76px;"
		>
			<CdsFloatingActionButton
				icon="search-outline"
				size="sm"
				variant="white"
			/>
		</div>
		<CdsFloatingActionButton
			icon="plus-outline"
			size="md"
			variant="green"
		/>
	</div>
</PreviewContainer>


### Botão com sub-itens

<PreviewContainer>
	<div style="position: relative">
		<img
			src="https://images.unsplash.com/photo-1738526787238-96d5352c2ba9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			style="width: 100%;"
		/>
		<CdsFloatingActionButton
			v-bind="args"
			v-on="internalEvents"
		/>
	</div>
	<LogBuilder ref="logBuilderRef" :events />
</PreviewContainer>

<PlaygroundBuilder
	:args
	component="FloatingActionButton"
/>

---

## Props

<APITable
	name="FloatingActionButton"
	section="props"
/>
<br>

## Eventos

<APITable
	name="FloatingActionButton"
	section="events"
/>


<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';
import CdsFloatingActionButton from '@/components/FloatingActionButton.vue';

const logBuilder = useTemplateRef('logBuilderRef');

const events = [
	'main-button-click',
	'action-click'
];

const internalEvents = ref({});

const args = ref({
	actions: [
		{
			icon: 'document-outline',
			label: 'Documentos',
		},
		{
			icon: 'home-outline',
			label: 'Início',
		},
		{
			icon: 'edit-outline',
			label: 'Editar',
		}
	],
	variant: 'green',
	size: 'md',
});

onMounted(() => {
	internalEvents.value = logBuilder.value.createEventListeners();
});
</script>
