import { describe, test, expect } from 'vitest';
import PolarAreaChart from '../components/PolarAreaChart.vue';
import { shallowMount } from '@vue/test-utils';

const mockedData = [
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

describe('PolarAreaChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(PolarAreaChart, {
			props: {
				labels: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio'],
				variant: 'green',
				data: mockedData,
				isVisiblePointNames: true,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
