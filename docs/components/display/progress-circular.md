# ProgressCircular

ProgressCirculars são componentes que indicam o status/progresso de uma operação em andamento, em formato circular.

---
<br>

## Quando usar:
- For necessário transmitir a ideia de progresso ou percentual de uma operação em andamento.
- For necessário transmitir a ideia de status de uma operação em andamento e que fração dela já foi concluída.
- For necessário chamar a atenção do usuário para uma informação específica de maneira gráfica.

<br>

## Quanddo não usar:
- For necessário representar fração de um processo com muitas etapas.

---

## Uso

```js
<CdsProgressCircular
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="progressCircularClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsProgressCircular"
/>

---

## Props

<APITable
	name="CdsProgressCircular"
	section="props"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsProgressCircular from '@/components/ProgressCircular.vue';

const args = ref({
	value: 35,
	variant: "blue",
});
</script>
