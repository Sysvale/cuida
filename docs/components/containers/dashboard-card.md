# DashboardCards

### DashboardCards são componentes utilizados para construir cards com informações que requeiram uma descrição curta e que possam ser classificadas em status.
---
<br />

## Quando usar:
- For necessário mostrar informações de modo resumido em dashboards
- For necessário um card com botão clicável e que leve o usuário a uma nova tela.
- A informação descrita no card possa ser classificada.


<br />

## Quando não usar:
- Houver um conjunto muito grande de informações a ser exibido.
- Se deseja utilizar ícones em conjunto com os dados. Utilize <a href="https://sysvale.github.io/cuida/?path=/docs/componentes-containers-expansioncard--expansion-card">ExpansionCards</a> nesses cenários.

<br />

## Observações:
- O DashboardCard exibee informações de modo vertical, ao contrário do <a href="https://sysvale.github.io/cuida/?path=/docs/componentes-containers-expansioncard--expansion-card">ExpansionCard</a>.
- <a href="https://sysvale.github.io/cuida/?path=/docs/componentes-containers-expansioncard--expansion-card">ExpansionCards</a> comunicam informações de modo mais direto e com auxílio de ícones. DashboardCars focam mais em descrição e classificação das informações.
- Considere utilizar DashboardCards se precisa que o componente redirecione o usuário para outra página para mais informações.
- Considere <a href="https://sysvale.github.io/cuida/?path=/docs/componentes-containers-expansioncard--expansion-card">ExpansionCards</a> se for necessário detalhar o conteúdo do card, mas sem tirar o usuário da página.

---

## Uso

```js
<CdsDashboardCard
	:showAction="true"
	action="Ver lista"
	@action-button-click="handleActionClick"
>
	<template #title-slot>
		<bold>45</bold>
		<span style="margin-left: 8px; font-size: 13.5px; font-weight: 500;">gestantes</span>
	</template>
	<template #status-slot>
		<CdsBadge variant="red">Alerta</CdsBadge>
	</template>
	<template #description-slot>
		Não realizam consulta há mais de 30 dias
	</template>
</CdsDashboardCard>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsDashboardCard"
	:events="cdsDashboardCardEvents"
>
	<template #title-slot>
		<bold>45</bold>
		<span style="margin-left: 8px; font-size: 13.5px; font-weight: 500;">gestantes</span>
	</template>
	<template #status-slot>
		<CdsBadge variant="red">Alerta</CdsBadge>
	</template>
	<template #description-slot>
		Não realizam consulta há mais de 30 dias
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="DashboardCard"
	section="props"
/>
<br />

## Eventos

<APITable
	name="DashboardCard"
	section="events"
/>
<br />

## Slots

<APITable
	name="DashboardCard"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsDashboardCard from '@/components/DashboardCard.vue';

const cdsDashboardCardEvents = [
	'action-button-click'
];

const args = ref({
	showAction: 'true',
	action: 'Ver lista',
});
</script>
