# QuickActionBar

O QuickActionBar é um componente de busca e ação rápida que permite ao usuário pesquisar informações em diferentes áreas do sistema, como usuários cadastrados, métricas e palavras-chave. Além da busca, ele oferece a capacidade de tomar ações, funcionando como uma barra de ação rápida que retorna as opções disponíveis, possibilitando o acesso em situações nas quais essas ações podem ser realizadas.

## Quando usar

- Quando o usuário precisar de uma busca completa e integrada que abranja diversas áreas e informações do sistema;
- Quando é importante apresentar rapidamente resultados consolidados de várias origens sem que o usuário precise navegar entre diferentes seções;
- Para simplificar o acesso a registros específicos, independentemente de onde estejam no sistema, como pessoas, dados analíticos, documentos e palavras-chave;
- Quando ações rápidas, como a criação de novos registros ou métricas, puderem estar acessíveis diretamente da barra de busca.

## Quando não usar

- Quando o usuário necessita de um filtro ou busca específica dentro de uma seção restrita do sistema. Nesse caso, considere usar filtros ou campos de busca locais;
- Para ações que requerem pouca atenção do usuário, como buscas triviais que não exigem visibilidade em tela cheia.

---

## Uso

```js
<CdsQuickActionBar
	v-bind="args"
	v-model="showSearchBar"
	:groups="filteredItems"
	:recents="recents"
	@search="filterItems"
	@onItemClick="console.log('Item clicado: ', $event)"
	@onSeeMoreClick="console.log('Ver mais clicado: ', $event)"
	@onRemoveRecent="console.log('Item removido:', $event)"
	@onEnterPress="console.log('Enter clicado:', $event)"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsQuickActionBar"
	:events="cdsQuickActionBarEvents"
	with-trigger
	@trigger-click="args.modelValue = !args.modelValue"
/>

---

## Props

<APITable
	name="QuickActionBar"
	section="props"
/>
<br />

## Eventos

<APITable
	name="QuickActionBar"
	section="events"
/>
<br />

## Slots

<APITable
	name="QuickActionBar"
	section="slots"
/>

---

<script setup>
import { ref } from 'vue';
import CdsQuickActionBar from '@/components/QuickActionBar.vue';

const recents = [
	{
		title: 'Carla Santana',
		cpf: '22233344405',
	},
	{
		title: 'Carlota Oliveira',
	},
	{
		title: 'Rodrigo Barboza',
	},
	{
		title: 'Lucas Barbosa',
		cpf: '22233344405',
	},
	{
		title: 'Greg Uesley Silver',
		cpf: '22233344405',
	},
	{
		title: 'coração',
	},
];

const groups = [
	{
		category: 'Gestantes',
		results: [
			{
				title: 'Carla Santana',
				cpf: '22233344405',
				cns: '900098367891993'
			},
			{
				title: 'Carliane Ferreira',
				cpf: '22233344405',
				cns: '900098367891993'
			},
			{
				title: 'Fernanda Cardoso da Fonseca',
				cpf: '22233344405',
				cns: '900098367891993'
			},
			{
				title: 'Rafael Assunção',
				cpf: '22233344405',
				cns: '900098367891993'
			},
			{
				title: 'Alzira Monte',
				cpf: '22233344405',
				cns: '900098367891993'
			},
			{
				title: 'Antônio de Almeida Castro Silva',
				cpf: '22233344405',
				cns: '900098367891993'
			},
			{
				title: 'Marcela da Cunha',
				cpf: '22233344405',
				cns: '900098367891993'
			},
			{
				title: 'Euclides do Amaral',
				cpf: '22233344405',
				cns: '900098367891993'
			},
			{
				title: 'Constantino Xavier',
				cpf: '22233344405',
				cns: '900098367891993'
			},
		]
	},
	{
		category: 'Métricas',
		results: [
			{
				title: 'Nº de pessoas',
				num: 398,
			},
			{
				title: 'Nº de crianças',
				num: 398,
			},
			{
				title: 'Nº de cachorros',
				num: 3,
			},
			{
				title: 'Nº de gatos',
				num: 0,
			},
			{
				title: 'Média de pessoas',
				num: 398,
			},
			{
				title: 'Moda de animais por residência',
				num: 398,
			},
			{
				title: 'Moda de sertanejo',
				num: 400,
			},
			{
				title: 'Máximo de pessoas em uma residência',
				num: 400,
			},
			{
				title: 'Máximo de pessoas em um bairro',
				num: 400,
			},
			{
				title: 'Máximo de pessoas em uma cidade',
				num: 400,
			},
		]
	},
];


const args = ref({
	recents,
	groups,
});

const cdsQuickActionBarEvents = [
	'update:modelValue',
	'search',
	'onItemClick',
	'onSeeMoreClick',
	'close',
	'onRemoveRecent',
	'onEnterPress'
];
</script>
