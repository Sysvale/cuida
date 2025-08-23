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

<DemoContainer
	:component="CdsAvatar"
	:events="cdsAvatarEvents"
/>

---

## Props

<APITable
	name="Avatar"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Avatar"
	section="events"
/>
<br />

## Slots

<APITable
	name="Avatar"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsAvatar from '@/components/Avatar.vue';
import APITable from '../../docgen/APITable.vue';
import DemoContainer from '../../docgen/DemoContainer.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

const cdsAvatarEvents = [
	'click'
];
</script>
