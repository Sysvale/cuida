# Flexbox

Flexbox é um componente que usa a API de Flexbox do CSS para fornecer controle sobre o alinhamento e distribuição de elementos em uma única dimensão (linha ou coluna).

### Quando usar

- Para alinhar elementos em uma única dimensão, seja em linha ou coluna.
- Quando for necessário distribuir o espaço entre itens de forma responsiva, adaptando-se ao tamanho da tela.
- Para centralizar elementos horizontal ou verticalmente dentro de um contêiner.
- Quando for necessário controlar o crescimento, encolhimento e espaçamento de elementos filhos em relação ao contêiner pai.

### Quando não usar

- Quando o layout requer organização em duas dimensões (linhas e colunas simultaneamente). Para esses casos, utilize o `CdsGrid`.
- Para cenários que envolvem estruturas complexas de layout, como Dashboards ou Galerias de Imagens, onde o controle bidimensional é necessário.
- Em situações onde o posicionamento fixo ou absoluto é necessário para controlar o layout do conteúdo.

---

## Uso

```js
<CdsFlexbox
	direction="row"
	:gap="1"
	wrap="wrap"
	justify="start"
	align="start"
	tag="div"
>
	<div>FlexItem 1</div>
	<div>FlexItem 2</div>
	<div>FlexItem 3</div>
	<div>FlexItem 4</div>
</CdsFlexbox>
```

---

## Preview

<DemoContainer
	:component="CdsFlexbox"
	:events="cdsFlexboxEvents"
/>

---

## Props

<APITable
	name="Flexbox"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Flexbox"
	section="events"
/>
<br />

## Slots

<APITable
	name="Flexbox"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsFlexbox from '@/components/Flexbox.vue';
import APITable from '../../docgen/APITable.vue';
import DemoContainer from '../../docgen/DemoContainer.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

const cdsFlexboxEvents = [];
</script>
