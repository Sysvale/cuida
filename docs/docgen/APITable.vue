<template>
	<CdsTable
		v-if="tableData.value.length"
		:fields="tableFields"
		:items="tableData"
		:no-wrap="section === 'props' ? false : true"
	>
		<template #table-item="{ data, field }">
			<template v-if="field === 'name'">
				<code>{{ apiSectionPrefix }}{{ data.name }}</code>
			</template>

			<template v-if="section === 'props' && field === 'values'">
				<code v-for="value in data.values">{{ value }} <br /></code>
			</template>
		</template>
	</CdsTable>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import componentsData from '../.docgen/components.json'
import CdsTable from '@/components/Table.vue';

const props = withDefaults(defineProps<{
	name: string,
	section: string,
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

const eventsAndSlotsFields = [
	{
		key: 'name',
		label: 'Nome',
	},
	{
		key: 'description',
		label: 'Descrição',
		width: '100%',
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
const propsData = computed(() => componentData.value?.props ?? []);
const slotsData = computed(() => componentData.value?.slots ?? []);
const eventsData = computed(() => componentData.value?.events ?? []);
const apiSectionPrefix = computed(() => {
	if (props.section === 'slots') return '#';
	if (props.section === 'events') return '@';

	return ''
});

const tableData = computed(() => {
	if (props.section === 'slots') return slotsData;
	if (props.section === 'events') return eventsData;

	return propsData;
});

const tableFields = computed(() => {
	if (props.section === 'props') return propsFields;

	return eventsAndSlotsFields;
});
</script>
