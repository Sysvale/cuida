
import { describe, test, expect } from 'vitest';
import DataTable from '../components/DataTable.vue';
import { shallowMount } from '@vue/test-utils';

const fields = ['field1', 'field2', 'field3'];
const customColumns = [
	{
		label: 'Nome',
		id: '1',
		visible: true,
	},
	{
		label: 'Sobrenome',
		id: '2',
		visible: true,
	},
	{
		label: 'Idade',
		id: '3',
		visible: true,
	},
	{
		label: 'CPF',
		id: '4',
		visible: false,
	},
	{
		label: 'RG',
		id: '5',
		visible: false,
	},
	{
		label: 'Endereço',
		id: '6',
		visible: true,
	}
];

describe('DataTable', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(DataTable, {
			props: {
				fields,
				selectionVariant: 'green',
				totalItems: 200,
				customColumnsList: customColumns,
				items: [
					{
						field1: 'field 1 content',
						field2: 'field 2 content',
						field3: 'field 3 content',
					},
					{
						field1: 'field 1 content',
						field2: 'field 2 content',
						field3: 'field 3 content',
					},
				],
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
