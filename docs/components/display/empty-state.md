# EmptyState

EmptyStates são componentes utilizados em momentos instrutivos aos usuários.

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

<PreviewContainer
	image="https://static.vecteezy.com/system/resources/thumbnails/011/537/753/small_2x/box-empty-state-single-isolated-icon-with-flat-style-free-vector.jpg"
	image-description="Imagem de empty state"
	title="Título do empty state"
	text="Para sair dessa situação de empty state, realize a ação abaixo"
	:component="CdsEmptyState"
	:events="cdsEmptyStateEvents"
/>

---

## Props

<APITable
	name="EmptyState"
	section="props"
/>
<br />

## Eventos

<APITable
	name="EmptyState"
	section="events"
/>
<br />

## Slots

<APITable
	name="EmptyState"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsEmptyState from '@/components/EmptyState.vue';

const cdsEmptyStateEvents = [
	'actionButtonClick'
];
</script>
