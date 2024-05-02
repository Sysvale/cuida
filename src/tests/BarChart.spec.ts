import { describe, test, expect } from 'vitest';
import BarChart from '../components/BarChart.vue';
import { shallowMount } from '@vue/test-utils';

const mockedData = [
	{
		name: 'Ecocardiograma',
		datasets: [
			{
				label: 'Realizado',
				data: [50, 50, 50, 50, 50],
			},
			{
				label: 'Pendente',
				data: [200, 180, 250, 190, 280],
			},
			{
				label: 'Não realizado',
				data: [38, 84, 120, 90, 185],
			}
		]
	},
	{
		name: 'Raio-X',
		datasets: [
			{
				label: 'Realizado',
				data: [120, 220, 180, 320, 150],
			},
			{
				label: 'Pendente',
				data: [98, 145, 160, 190, 175],
			},
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
				label: 'Realizado',
				data: [55, 40, 33, 90, 120],
			},
			{
				label: 'Pendente',
				data: [25, 30, 90, 45, 20],
			},
			{
				label: 'Não realizado',
				data: [38, 84, 120, 90, 45],
			}
		]
	}
];

describe('BarChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(BarChart, {
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
