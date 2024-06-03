import { describe, test, expect } from 'vitest';
import RadialBarChart from '../components/RadialBarChart.vue';
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

const mockedColors = ['teal', 'violet', 'amber', 'blue', 'red'];

describe('RadialBarChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(RadialBarChart, {
			props: {
				labels: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio'],
				variant: 'green',
				data: mockedData,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('it accepts valid colors', () => {
		const validator = RadialBarChart.props.colors.validator;
		const invalidColors = [...mockedColors, 'silver'];
		expect(validator(mockedColors)).toBe(true);
		expect(validator(invalidColors)).toBe(false);
	});
});
