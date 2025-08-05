<template>
	<template
		v-if="componentData.events?.length"
	>
		<CdsTable
			:fields="defaultFields"
			:items="eventsData"
			no-wrap
		>
			<template #table-item="{ data, field }">
				<template v-if="field === 'name'">
					<code>@{{ data.name }}</code>
				</template>
			</template>
		</CdsTable>
	</template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import componentsData from '../.docgen/components.json'
import CdsTable from '@/components/Table.vue';

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

const defaultFields = [
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

const componentData = computed(() => componentsData[props.name] || {});
const eventsData = computed(() => componentData.value?.events);
</script>
