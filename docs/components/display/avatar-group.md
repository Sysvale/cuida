# AvatarGroup

AvatarGroups exibem vários avatares agrupados em forma de pilha.

### Quando usar

- Utilize AvatarGroups quando, em um determinado contexto, vários usuários dividirem responsabilidades sobre uma informação ou regra de negócio.

### Quando não usar

- Em casos que apenas a informação de um usuário será apresentada.

### Observações

- Ao passar o mouse sobre cada Avatar será mostrado um tooltip com o nome do usuário, caso tenha sido informado.
- Quando o número de avatares foi maior que o valor especificado na prop maxCount será exibido um avatar com um contador indicando o número de avatares que foram suprimidos do AvatarGroup. Este contador é clicável e abre um Popover com a lista de avatares suprimidos.

---

## Uso

```js
<CdsAvatarGroup
	:avatars="avatars"
	size="md"
	:maxCount="4"
/>
```

---

## Preview

<DemoContainer
	:component="CdsAvatarGroup"
	:events="cdsAvatarGroupEvents"
/>

---

## Props

<APITable
	name="AvatarGroup"
	section="props"
/>
<br />

## Eventos

<APITable
	name="AvatarGroup"
	section="events"
/>
<br />

## Slots

<APITable
	name="AvatarGroup"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsAvatarGroup from '@/components/AvatarGroup.vue';
import APITable from '../../docgen/APITable.vue';
import DemoContainer from '../../docgen/DemoContainer.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

const cdsAvatarGroupEvents = [];
</script>
