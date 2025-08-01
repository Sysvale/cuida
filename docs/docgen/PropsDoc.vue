<template>
	<template
		v-if="componentData.props?.length"
	>
		<CdsTable
			:fields="propsFields"
			:items="propsData"
		>
			<template #table-item="{ data, field }">
				<template v-if="field === 'name'">
					<code>{{ data.name }}</code>
				</template>

				<template v-if="field === 'values'">
					<code v-for="value in data.values">{{ value }} <br /></code>
				</template>
			</template>
		</CdsTable>
	</template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import componentsData from '../.docgen/components.json'
import CdsTable from '@//components/Table.vue';

const props = withDefaults(defineProps<{
	name: string,
}>(), {
	name: 'Button',
});

const dataSet = [
	{
		title: 'Props',
		name: 'props',
	},
	{
		title: 'Eventos',
		name: 'events',
	},
	{
		title: 'Slots',
		name: 'slots',
	},
];

const propsFields = [
	{
		key: 'name',
		label: 'Nome',
	},
	{
		key: 'type.name',
		label: 'Tipo',
	},
	{
		key: 'defaultValue.value',
		label: 'Default',
	},
	{
		key: 'values',
		label: 'Opções',
	},
	{
		key: 'description',
		label: 'Descrição',
	},
];

const componentData = computed(() => componentsData[props.name] || {});
const propsData = computed(() => componentData.value?.props);
</script>
