import { describe, test, expect } from 'vitest';
import StackedBarChart from '../components/StackedBarChart.vue';
import { shallowMount } from '@vue/test-utils';

const mockedData = [
	{
		name: 'Ecocardiograma',
		datasets: [
			{
				label: 'Realizado',
				data: [50, 50, 50, 50, 50],
			},
		]
	},
	{
		name: 'Raio-X',
		datasets: [
			{
				label: 'Não realizado',
				data: [49, 84, 120, 78, 130],
			}
		]
	},
	{
		name: 'Tomografia',
		datasets: [
			{
				label: 'Não realizado',
				data: [38, 84, 120, 90, 45],
			}
		]
	}
];

describe('StackedBarChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(StackedBarChart, {
			props: {
				labels: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio'],
				variant: 'green',
				data: mockedData,
				barWidth: 1,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
