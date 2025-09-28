# Scrollable

### Scrollable é um componente utilizado para o tornar o conteúdo envolvido "scrolável".
---
<br>

## Quando usar:
- Se quer mostrar muito conteúdo em um espaço pequeno ou pré-definido.

<br>

## Quando não usar:
- Houver pouco conteúdo.
- Já houver um outro scrollable.

---

## Uso

```js
<CdsScrollable
	maxHeight="150px"
>
	<p>
		Existe uma teoria que diz que, se um dia alguém descobrir 
		exatamente para que serve o Universo e por que ele está aqui, ele 
		desaparecerá instantaneamente e será substituídopor al go ainda 
		mais estranho e inexplicável. Existe uma segunda teoria que diz 
		que isso já aconteceu.
	</p>
	<p>
		Existe uma teoria que diz que, se um dia alguém descobrir 
		exatamente para que serve o Universo e por que ele está aqui, ele 
		desaparecerá instantaneamente e será substituídopor al go ainda 
		mais estranho e inexplicável. Existe uma segunda teoria que diz 
		que isso já aconteceu.
	</p>
	<p>
		Existe uma teoria que diz que, se um dia alguém descobrir 
		exatamente para que serve o Universo e por que ele está aqui, ele 
		desaparecerá instantaneamente e será substituídopor al go ainda 
		mais estranho e inexplicável. Existe uma segunda teoria que diz 
		que isso já aconteceu.
	</p>
	<p>
		Existe uma teoria que diz que, se um dia alguém descobrir 
		exatamente para que serve o Universo e por que ele está aqui, ele 
		desaparecerá instantaneamente e será substituídopor al go ainda 
		mais estranho e inexplicável. Existe uma segunda teoria que diz 
		que isso já aconteceu.
	</p>
</CdsScrollable>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsScrollable"
	:events="cdsScrollableEvents"
>
	<p>
		Existe uma teoria que diz que, se um dia alguém descobrir 
		exatamente para que serve o Universo e por que ele está aqui, ele 
		desaparecerá instantaneamente e será substituídopor al go ainda 
		mais estranho e inexplicável. Existe uma segunda teoria que diz 
		que isso já aconteceu.
	</p>
	<p>
		Existe uma teoria que diz que, se um dia alguém descobrir 
		exatamente para que serve o Universo e por que ele está aqui, ele 
		desaparecerá instantaneamente e será substituídopor al go ainda 
		mais estranho e inexplicável. Existe uma segunda teoria que diz 
		que isso já aconteceu.
	</p>
	<p>
		Existe uma teoria que diz que, se um dia alguém descobrir 
		exatamente para que serve o Universo e por que ele está aqui, ele 
		desaparecerá instantaneamente e será substituídopor al go ainda 
		mais estranho e inexplicável. Existe uma segunda teoria que diz 
		que isso já aconteceu.
	</p>
	<p>
		Existe uma teoria que diz que, se um dia alguém descobrir 
		exatamente para que serve o Universo e por que ele está aqui, ele 
		desaparecerá instantaneamente e será substituídopor al go ainda 
		mais estranho e inexplicável. Existe uma segunda teoria que diz 
		que isso já aconteceu.
	</p>
</PreviewBuilder>

---

## Props

<APITable
	name="Scrollable"
	section="props"
/>
<br>

## Slots

<APITable
	name="Scrollable"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsScrollable from '@/components/Scrollable.vue';

const cdsScrollableEvents = [];
const args = ref({
	maxHeight: "150px"
});
</script>
