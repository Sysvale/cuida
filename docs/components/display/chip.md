# Chip

### Chips ajudam as pessoas a inserir informações, fazer seleções, filtrar conteúdo ou disparar ações.
---
<br>

## Quando usar:
- For necessário selecionar e/ou filtrar conteúdo
- O conteúdo que a chip representa puder ser setado ou removido pelo usuário.

<br>

## Quando não usar:
- O conteúdo a ser mostrado for *readonly* (nesse caso, é mais indicado utlizar o componente Badge).

---

## Uso

```js
<CdsChip
	v-model="select"
	variant="red"
	size="md"
>
	Chip
</CdsChip>
```

---

## Preview

<PreviewBuilder
	:args
	:events
	component="CdsChip"
>
	Chip
</PreviewBuilder>


---

## Props

<APITable
	name="CdsChip"
	section="props"
/>
<br>


## Slots

<APITable
	name="CdsChip"
	section="slots"
/>

---

<!-- ## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/> -->

<script setup>
import { ref } from 'vue';
import CdsChip from '@/components/Chip.vue';

const events = ['click'];

const args = ref({
	variant: 'red',
	persistantActionIcon: false,
	iconLeft: true
});
</script>
