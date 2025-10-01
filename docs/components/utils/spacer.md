# Spacer

Componente auxiliar utilizado para adicionar paddings e margins seguindo o padrão de tokens do Cuida.

## Quando usar

- No caso de determinado componente ou elemento da interface precisar apenas de espaçamento (padding ou margin) como modificar de estilo.

## Quando não usar

- Nos casos em que determinado componente precisar de vários modificadores de estilo. Pra esses casos
utilize classes e nelas inclua paddings e margins com os tokens de espaçamento do Cuida.

<br>

## Observações:
- ⚠️ Dê preferência sempre que possível à utilização dos tokens em detrimento ao Spacer.
- O valor mandado para as props do Spacer é sempre multiplicado por 4, assim como nos tokens scss do Cuida.
- O valor máximo aceito é 12.
- O spacer não implementa margins e paddings negativos.

---

## Uso

```js
<CdsSpacer padding="4">
	Conteúdo
</CdsSpacer>
```

---

## Preview

<PreviewContainer>
	<div style="width: fit-content; background-color: #def7eb; border-radius: 20px">
		<div
			style="padding: 0.5px; background-color: #def7eb; border-radius: 20px"
		>
			<CdsSpacer v-bind="args">
				<div style="width: 100px; height: 100px; background-color: #2AC092; border-radius: 20px"/>
			</CdsSpacer>
		</div>
	</div>
</PreviewContainer>

<PlaygroundBuilder
	component="Spacer"
	:args
/>

---

## Props

<APITable
	name="CdsSpacer"
	section="props"
/>
<br>

## Slots

<APITable
	name="CdsSpacer"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsSpacer from '@/components/Spacer.vue';

const args = ref({});
</script>
