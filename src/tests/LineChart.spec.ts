import { describe, test, expect } from 'vitest';
import LineChart from '../components/LineChart.vue';
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
				label: 'Realizado',
				data: [120, 220, 180, 320, 150],
			},
		]
	},
	{
		name: 'Tomografia',
		datasets: [
			{
				label: 'Realizado',
				data: [55, 40, 33, 90, 120],
			},
		]
	}
];

describe('LineChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(LineChart, {
			props: {
				labels: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio'],
				variant: 'green',
				showLabelName: true,
				data: mockedData,
				fill: false,
				isDashed: false,
				borderDash: [5,5],
				smoothing: 0.6,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
