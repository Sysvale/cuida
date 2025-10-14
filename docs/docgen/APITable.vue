<template>
	<CdsTable
		v-if="tableData.value.length"
		:fields="tableFields"
		:items="tableData"
		transparent
	>
		<template #table-item="{ data, field }">
			<template v-if="field === 'name'">
				<CdsRequiredIndicator v-if="data.required" />
				<code>{{ apiSectionPrefix }}{{ data.name }}</code>
				<span
					v-if="data.required"
					style="color: #C92C3F"
				> (required)</span>
				<CdsBadge
					v-if="data.tags?.deprecated?.length"
					variant="red"
					size="sm"
					class="mt-2"
				>
					Deprecated
				</CdsBadge>
			</template>

			<template v-if="section === 'props' && field === 'values'">
				<span v-if="!data.values?.length"> -- </span>
				<code
					v-for="value in data.values"
					:key="value"
				>
					{{ value }}
					<br>
				</code>
			</template>

			<template v-if="field === 'description'">
				<span v-if="typeof data.tags?.deprecated !== 'undefined'">
					{{ data.tags?.deprecated[0].description }}
				</span>
				<span v-else>
					{{ data.description }}
				</span>
			</template>
		</template>
	</CdsTable>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import componentsData from '../.docgen/components-metadata.json'
import CdsTable from '@/components/Table.vue';
import CdsRequiredIndicator from '@/components/RequiredIndicator.vue';

const props = withDefaults(defineProps<{
	name: string,
	section: string,
}>(), {
	name: 'Button',
});

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
		width: '50%'
	},
];

const componentData = computed(() => (componentsData as Record<string, any>)[props.name] || {});
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
