# PanelCard

### PanelCards são componentes utilizados para agrupar informação em containers com uma estrutura mínima formada por título, subtítulo, e conteúdo.
---
<br />

## Quando usar:
- Houver a construção de páginas e dashboards com cars em grid.
- O slot de ações deve agrupar ícones ou botões que aplicam mudanças em todas as informações contidas no PainelCard.

<br />

## Quando não usar:
- For necessário agrupar elementos fora da estrutura básica: título + subtítulo + conteúdo.
- Ele for o único componente do seu tipo na página, ocupando toda a largura disponível.

---

## Uso

```js
<CdsPanelCard
	title="Redes"
	subtitle="Habilite as redes da regulação"
>
	<template #panel-actions>
		<strong>#</strong>
	</template>
	Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
	vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
	Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
	divoltis porris, paradis. Leite de capivaris, leite de mula
	manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
	litora torquent. Per aumento de cachacis, eu reclamis. Nec
	orci ornare consequat. Praesent lacinia ultrices consectetur.
	Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
</CdsPanelCard>
```

---

## Preview

<PreviewContainer
	:component="CdsPanelCard"
	title="Redes"
	subtitle="Habilite as redes da regulação"
>
	<template #panel-actions>
		<strong>#</strong>
	</template>
	Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
	vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
	Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
	divoltis porris, paradis. Leite de capivaris, leite de mula
	manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
	litora torquent. Per aumento de cachacis, eu reclamis. Nec
	orci ornare consequat. Praesent lacinia ultrices consectetur.
	Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
</PreviewContainer>

---

## Props

<APITable
	name="PanelCard"
	section="props"
/>
<br />

## Slots

<APITable
	name="PanelCard"
	section="slots"
/>

<script setup>
import CdsPanelCard from '@/components/PanelCard.vue';
</script>
