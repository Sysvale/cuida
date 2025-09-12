# Text

Text são indicadores de status utilizados para tornar evidentes metadados importantes.

### Quando usar

- For necessário mostrar status associados com a lógica de negócio ou ações do usuário.
- O conteúdo a ser mostrado for *readonly*.
- For preciso categorizar algo.

### Quando não usar

- O conteúdo que a text representa puder ser setado ou removido pelo usuário.
- O click no componente precisar executar uma ação ou funcionalidade.

---

## Uso

```js
<CdsText
	as="span"
	textAlign='start'
	:noMargin="false"
>
	O empenho em analisar o desenvolvimento contínuo de distintas formas de atuação obstaculiza a apreciação da importância do retorno esperado a longo prazo.
</CdsText>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsText"
>
	O empenho em analisar o desenvolvimento contínuo de distintas formas de atuação obstaculiza a apreciação da importância do retorno esperado a longo prazo.
</PreviewBuilder>

---

## Props

<APITable
	name="Text"
	section="props"
/>

<br />

## Slots

<APITable
	name="Text"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsText from '@/components/Text.vue';

const args = ref({});
</script>
