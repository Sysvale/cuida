# FloatingActionButton (FAB)

### O FloatingActionButton é um botão que flutua sobre a interface do usuário, sempre visível, usado para promover uma ação primária ou frequente em um aplicativo.
---
<br />

## Quando usar:
- Para destacar a ação principal ou mais importante em uma tela.
- Em aplicações móveis ou responsivas onde é necessário um acesso rápido a uma funcionalidade específica.
- Quando a interface precisa de um elemento de ação que seja altamente visível e de fácil acesso.
- Em telas onde o espaço é limitado e um botão tradicional ocuparia muito espaço ou distrairia o usuário.

<br />

## Quando não usar:
- Quando há múltiplas ações principais com a mesma importância, pois o FAB é destinado a uma única ação primária.
- Em telas onde a ação não é crítica ou não é frequentemente utilizada pelo usuário.
- Em interfaces que já possuem muitos elementos flutuantes ou sobrepostos, para evitar poluição visual.
- Em telas grandes (desktop), onde um botão tradicional ou outro componente de interface pode ser mais apropriado.

---

## Uso

```js
<CdsFloatingActionButton
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="floatingActionButtonClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsFloatingActionButton"
	:events
/>

---

## Props

<APITable
	name="FloatingActionButton"
	section="props"
/>
<br />

## Eventos

<APITable
	name="FloatingActionButton"
	section="events"
/>
<br />

## Slots

<APITable
	name="FloatingActionButton"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsFloatingActionButton from '@/components/FloatingActionButton.vue';

const events = [
	'floatingActionButton-click'
];

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
</script>
