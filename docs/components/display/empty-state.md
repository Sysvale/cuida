# EmptyState

EmptyStates são componentes utilizados em momentos instrutivos aos usuários.

---

### Quando usar

- For necessário instruir o usuário sobre o funcionamento de uma determinada página.
- Uma página ou componente não possuir conteúdo padrão a ser mostrado.
- Uma determinada ação resultar em erro.

### Quando não usar

- Utilizado como um loader.
- Utilizado apenas com título.

---

## Uso

```js
<CdsEmptyState
	image="static/media/CuidaTempLogo.f4adb1cc.png"
	image-description="Imagem de empty state"
	title="Título do empty state"
	text="Para sair dessa situação de empty state, realize a ação abaixo"
	action-button-text="Adicionar novo recurso"
	@action-button-click="handleClick"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsEmptyState"
	:events="cdsEmptyStateEvents"
/>

---

## Props

<APITable
	name="CdsEmptyState"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsEmptyState"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsEmptyState"
	section="slots"
/>

---


<script setup>
import { ref } from 'vue';
import CdsEmptyState from '@/components/EmptyState.vue';

const cdsEmptyStateEvents = [
	'actionButtonClick'
];

const args = ref({
	image: "https://static.vecteezy.com/system/resources/thumbnails/011/537/753/small_2x/box-empty-state-single-isolated-icon-with-flat-style-free-vector.jpg",
	imageDescription: 'Imagem de empty state',
	title: 'Título do empty state',
	text: 'Para sair dessa situação de empty state, realize a ação abaixo',
});
</script>
