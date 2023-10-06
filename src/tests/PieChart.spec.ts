import { describe, test, expect } from 'vitest';
import PieChart from '../components/PieChart.vue';
import { shallowMount } from '@vue/test-utils';

const mockedData =[
	{
		name: 'Ecocardiograma',
		datasets: [
			{
				label: 'Exames realizados',
				data: [120, 220, 180, 320, 150],
			},
		]
	},
];

describe('PieChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(PieChart, {
			props: {
				labels: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio'],
				variant: 'green',
				data: mockedData,
			},
		});

		expect(wrapper).toMatchSnapshot();
	});
});
