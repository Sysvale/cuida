# Breadcrumb

### Breadcrumbs são utilizados para indicar ao usuário o caminho percorrido entre as páginas de uma aplicação até se checar na página atual.
---
<br />

## Quando usar:
- Quando houver dois ou mais níveis na hierarquia de páginas;
- Quando você precisar indicar ao usuário em que página ele está e como ele pode refazer os passos que o levaram à página atual;

<br />

## Quando não usar:
- Em casos nos quais só houver uma página na estrutura de navegação.

<br />

## Obs.:
- Idealmente Breadcrumbs devem ser usados com <b>três</b> ou mais níveis de hierarquia. Entretanto, o Breadcrumb do
Cuida pode ser usado com <b>dois</b> níveis pois nesse cenário ele se comporta como um botão de retorno para a página anterior.


---

## Uso

```js
<CdsBreadcrumb
	:items
/>
```

---

## Preview

##### Breadcrumb de 3 ou mais níveis:

<PreviewBuilder
	:component="CdsBreadcrumb"
	:items
/>

<br />

##### Breadcrumb de 2 níveis:

<PreviewBuilder
	:component="CdsBreadcrumb"
	:items="items2"
/>

---

## Props

<APITable
	name="Breadcrumb"
	section="props"
/>
<br />

<script setup>
import { ref } from 'vue';
import CdsBreadcrumb from '@/components/Breadcrumb.vue';

const items = ref([
	{
		label: 'Relatórios',
		route: {
			path: '/reports',
			name: 'reports'
		},
	},
	{
		label: 'Relatórios individualizados',
		route: {
			path: '/individualized-reports',
			name: 'individualized'
		},
	},
	{
		label: 'Relatório de usuários',
		route: {
			path: '/users-reports',
			name: 'users'
		},
	},
]);

const items2 = ref([
	{
		label: 'Relatórios',
		route: {
			path: '/reports',
			name: 'reports'
		},
	},
	{
		label: 'Relatórios individualizados',
		route: {
			path: '/individualized-reports',
			name: 'individualized'
		},
	},
]);
</script>
