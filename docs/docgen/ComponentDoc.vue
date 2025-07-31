<template>
	<CdsInnerTabs
		:tabs="dataSet"
		:active-tab="dataSet[0]"
		header-left
	>
		<template
			v-if="componentData.props?.length"
			#props
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

		<template
			v-if="componentData.events?.length"
			#events
		>
			<CdsTable
				:fields="defaultFields"
				:items="eventsData"
			>
				<template #table-item="{ data, field }">
					<template v-if="field === 'name'">
						<code>@{{ data.name }}</code>
					</template>
				</template>
			</CdsTable>
		</template>

		<template
			v-if="componentData.slots?.length"
			#slots
		>
			<CdsTable
				:fields="defaultFields"
				:items="slotsData"
			>
				<template #table-item="{ data, field }">
					<template v-if="field === 'name'">
						<code>#{{ data.name }}</code>
					</template>
				</template>
			</CdsTable>
		</template>
	</CdsInnerTabs>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import componentsData from '../.docgen/components.json'
import CdsTable from '../../src/components/Table.vue';
import CdsInnerTabs from '../../src/components/InnerTabs.vue';

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

const defaultFields = [
	{
		key: 'name',
		label: 'Nome',
	},
	{
		key: 'description',
		label: 'Descrição',
	},
];

const componentData = computed(() => componentsData[props.name] || {});
const propsData = computed(() => componentData.value?.props);
const eventsData = computed(() => componentData.value?.events);
const slotsData = computed(() => componentData.value?.slots);
</script>
