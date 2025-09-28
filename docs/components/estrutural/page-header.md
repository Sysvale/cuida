# PageHeader

### PageHeader são componentes utilizados para adicionar título, subtítulo e ações em páginas.
---
<br>

## Quando usar:
- Precisar colocar headers em páginas.
- Precisar adicionar botões de ação a nível de página.
- Precisar adicionar cards informativos no topo de páginas.

<br>

## Quando não usar:
- Fora do topo de páginas.

<br>

## Observações:
- ⚠️ Quando uma URL é colocada como parte do subtítulo, ela é renderizada como link no componente. Para tanto, a URL deve ser precedidada de http:// ou https://.

---

## Uso

```js
CdsPageHeader
	title="Procedimentos"
	subtitle="Gerencie os procedimentos cadastrados"
>
	<template
		#aside
	>
		<CdsFlexbox gap="2" wrap="no-wrap">
			<CdsButton
				secondary
				@click="logClick('Btn 1')"
				text="Button 1"
			/>
			<CdsButton
				class="d-flex align-items-center ml-4"
				variant="success"
				@click="logClick('Btn 2')"
				text="Button 2"
			/>
		</CdsFlexbox>
	</template>
</CdsPageHeader>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsPageHeader"
>
	<template
		#aside
	>
		<CdsFlexbox gap="2" wrap="no-wrap">
			<CdsButton
				secondary
				text="Button 1"
			/>
			<CdsButton
				variant="success"
				text="Button 2"
			/>
		</CdsFlexbox>
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="PageHeader"
	section="props"
/>
<br>

## Slots

<APITable
	name="PageHeader"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsPageHeader from '@/components/PageHeader.vue';

const args = ref({
	title:"Procedimentos",
	subtitle:"Crie painéis e os associe a serviços. Para acessar os painéis de modo externo, acesse https://short.sysvale.com/totem e insira a chave correspondente."
});
</script>
