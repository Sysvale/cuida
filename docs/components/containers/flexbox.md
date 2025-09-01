# FlexBox

### Flexbox é um componente que usa a API de Flexbox do CSS para fornecer controle sobre o alinhamento e distribuição de elementos em uma única dimensão (linha ou coluna).
---
<br />

## Quando usar:
- Para alinhar elementos em uma única dimensão, seja em linha ou coluna.
- Quando for necessário distribuir o espaço entre itens de forma responsiva, adaptando-se ao tamanho da tela.
- Para centralizar elementos horizontal ou verticalmente dentro de um contêiner.
- Quando for necessário controlar o crescimento, encolhimento e espaçamento de elementos filhos em relação ao contêiner pai.

<br />

## Quando não usar:
- Quando o layout requer organização em duas dimensões (linhas e colunas simultaneamente). Para esses casos, utilize o `<cds-grid>`.
- Para cenários que envolvem estruturas complexas de layout, como Dashboards ou Galerias de Imagens, onde o controle bidimensional é necessário.
- Em situações onde o posicionamento fixo ou absoluto é necessário para controlar o layout do conteúdo.

---

## Uso

```js
<CdsFlexbox
	class="grid-background"
	direction="row"
	:gap="1"
	wrap="wrap"
	justify="start"
	align="start"
	tag="div"
	:fluid="false"
>
	<div style="height: 50px; width: 300px" class="docs-grid-cell"> FlexItem 1 </div>
	<div style="height: 50px; width: 300px" class="docs-grid-cell"> FlexItem 2 </div>
	<div style="height: 50px; width: 300px" class="docs-grid-cell"> FlexItem 3 </div>
	<div style="height: 50px; width: 300px" class="docs-grid-cell"> FlexItem 4 </div>
</CdsFlexbox>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsFlexbox"
	class="grid-background"
	direction="row"
	:gap="1"
	wrap="wrap"
	justify="start"
	align="start"
	tag="div"
	:fluid="false"
>
	<div style="height: 50px; width: 300px" class="docs-grid-cell"> FlexItem 1 </div>
	<div style="height: 50px; width: 300px" class="docs-grid-cell"> FlexItem 2 </div>
	<div style="height: 50px; width: 300px" class="docs-grid-cell"> FlexItem 3 </div>
	<div style="height: 50px; width: 300px" class="docs-grid-cell"> FlexItem 4 </div>
</PreviewBuilder>

---

## Props

<APITable
	name="Flexbox"
	section="props"
/>
<br />

## Slots

<APITable
	name="Flexbox"
	section="slots"
/>

---

<script setup>
import CdsFlexbox from '@/components/Flexbox.vue';
</script>

<style>
.docs-grid-cell {
	font-size: 18px;
	font-weight: 550;
	background-color: #abedd3;
	border: 3px dashed #6ddfb1;
	color: #136746;
	padding: 12px;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.grid-background {
	background-size: 12px 12px;
	border-radius: 20px;
	padding: 4px;
	background-image: linear-gradient(135deg, #85deaf54 10%, #0000 0, #0000 50%, #85deaf54 0, #85deaf54 60%, #0000 0, #0000);
}
</style>
