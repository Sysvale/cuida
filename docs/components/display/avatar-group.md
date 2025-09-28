# AvatarGroup

### AvatarGroups exibem vários avatares agrupados em forma de pilha.
---
<br>

## Quando usar:
- Utilize AvatarGroups quando, em um determinado contexto, vários usuários 
dividirem resposabilidades sobre uma informação ou regra de negócio.

## Quando não usar:
- Em casos que apenas a informação de um usuário será apresentada.

## Observações:
- Ao passar o mouse sobre cada Avatar será mostrado um tooltip com o nome
do usuário, caso tenha sido informado.
- Quando o número de avatares foi maior que o valor especificado na prop maxCount
será exibido um avatar com um contador indicando o número de avatares
que foram suprimidos do AvatarGroup. Este contador é clicável e abre um Popover
com a lista de avatares suprimidos.

---

## Uso

```js
<CdsAvatarGroup
	:avatars
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsAvatarGroup"
/>

---

## Props

<APITable
	name="AvatarGroup"
	section="props"
/>
<br>

---

<!-- ## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/> -->

<script setup>
import { ref } from 'vue';
import CdsAvatarGroup from '@/components/AvatarGroup.vue';

const avatars = ref([
	{
		src: 'https://userstock.io/data/wp-content/uploads/2020/06/kimson-doan-HD8KlyWRYYM-4-1024x1024.jpg',
		name: 'Cho Smith',
	},
	{
		src: 'https://userstock.io/data/wp-content/uploads/2017/07/ayo-ogunseinde-221958-1024x723.jpg',
		name: 'Alice Brown',
	},
	{
		src: 'https://userstock.io/data/wp-content/uploads/2020/06/tyler-nix-PQeoQdkU9jQ-1024x1024.jpg',
		name: 'Leo Garcia',
	},
	{
		src: 'https://userstock.io/data/wp-content/uploads/2017/09/bewakoof-com-official-205182.jpg',
		name: 'Dave Jones',
	},
	{
		src: 'https://userstock.io/data/wp-content/uploads/2017/09/jason-blackeye-223584-1024x849.jpg',
		name: 'Maya Rodriguez',
	},
	{
		src: 'https://userstock.io/data/wp-content/uploads/2017/07/pexels-photo-289704-1024x682.jpg',
		name: 'Tina Smith',
	},
	{
		src: 'https://userstock.io/data/wp-content/uploads/2017/07/pexels-photo-26939-1-1024x1024.jpg',
		name: 'Paulo Williams',
	},
]);

const args = ref({
	avatars,
	size: 'md',
	maxCount: 4,
});
</script>
