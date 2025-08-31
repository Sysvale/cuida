# Grid

Grids são componentes que usam a API das grids CSS para prover estruturas de organização consistentes.

### Quando usar

- Para criar layouts responsivos e consistentes em toda a aplicação.
- Para alinhar elementos em linhas e colunas de forma uniforme.
- Na construção de Dashboards, Bento Grids, Galerias, etc.
- Em estruturas nas quais for necessário especificar a estrutura dos elementos de forma bidimensional, tanto em linhas quanto em colunas.

### Quando não usar

- Quando o design requer posicionamento absoluto ou fixo de elementos.
- Em componentes pequenos e auto-contidos que não necessitam de um sistema de grid.
- Em situações nas quais for necessário alinhar elementos apenas em uma das dimensões e não nas duas ao mesmo tempo. Para esses casos, utilize FlexBox.

### Observações

- O `CdsGrid` funciona em conjunto com o componente `CdsGridItem`. Por questões de simplicidade a documentação dos dois componentes está representada nessa página.
- O componente `CdsGridItem` não tem aplicabilidade prática sem o `CdsGrid`, são componentes dependentes.
- A prop `cols` aceita valores como Number, String ou Array para definir colunas.
- A prop `rows` aceita valores como Number, String ou Array para definir linhas.
- Props como `colSpan`, `rowSpan`, `colStart`, `rowStart` controlam posicionamento de itens.

---

## Uso

```js
<CdsGrid
	:cols="3"
	gap="20px"
>
	<CdsGridItem colSpan="2">
		<div>Cell 1</div>
	</CdsGridItem>
	<CdsGridItem>
		<div>Cell 2</div>
	</CdsGridItem>
	<CdsGridItem>
		<div>Cell 3</div>
	</CdsGridItem>
</CdsGrid>
```

---

## Preview

<PreviewContainer
	:component="CdsGrid"
	:events="cdsGridEvents"
/>

---

## Props

<APITable
	name="Grid"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Grid"
	section="events"
/>
<br />

## Slots

<APITable
	name="Grid"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsGrid from '@/components/Grid.vue';

const cdsGridEvents = [];
</script>
