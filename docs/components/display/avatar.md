# Avatar

Avatares são componentes utilizados para exibir representações visuais de usuários, como imagens ou nome.

### Quando usar

- Recomenda-se o uso de avatares quando o usuário ou lista de usuários possuir imagens ou nomes definidos.
- É geralmente usado em conjunto com Headers, NavBars, Tabelas, Cards e Listas.

---

## Uso

```js
<CdsAvatar
	src="https://thispersondoesnotexist.com/"
/>
```

---

## Preview

<PreviewContainer>
	<CdsAvatar
		v-bind="args" 
	>
		<template #dropdown-content>
			Conteúdo do dropdown
		</template>
	</CdsAvatar>
</PreviewContainer>

<PlaygroundBuilder :args :component="Avatar"/>

---

## Props

<APITable
	name="CdsAvatar"
	section="props"
/>
<br>

## Slots

<APITable
	name="CdsAvatar"
	section="slots"
/>

---

<!-- ## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/> -->

<script setup>
import { ref } from 'vue';
import CdsAvatar from '@/components/Avatar.vue';

const args = ref({
	src: 'https://thispersondoesnotexist.com/',
});
</script>
