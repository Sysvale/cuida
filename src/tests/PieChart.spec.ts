import { describe, test, expect, vi } from 'vitest';
import PieChart from '../components/PieChart.vue';
import { shallowMount } from '@vue/test-utils';

vi.mock('../utils/methods/paleteBuilder.js', () => ({
	default: vi.fn((rawPalete) => {
		return [
			{
				colorName: 'Light Neutrals',
				variantName: 'Light',
				color400: '#E7EDF3',
				colorShades: ['#FFFFFF', '#FAFCFE', '#F4F8FB', '#E7EDF3', '#DFE5EC'],
				colorTokens: ['$n-0', '$n-10', '$n-20', '$n-30', '$n-40'],
				colorData: [
					{ shade: '#FFFFFF', token: '$n-0' },
					{ shade: '#FAFCFE', token: '$n-10' },
					{ shade: '#F4F8FB', token: '$n-20' },
					{ shade: '#E7EDF3', token: '$n-30' },
					{ shade: '#DFE5EC', token: '$n-40' }
				]
			},
			{
				colorName: 'Piccolo Green',
				variantName: 'Green',
				color400: '#6ddfb1',
				colorShades: ['#f3fcf8', '#e2f8ef', '#abedd3', '#6ddfb1', '#2db981'],
				colorTokens: ['$gp-50', '$gp-100', '$gp-200', '$gp-300', '$gp-400'],
				colorData: [
					{ shade: '#f3fcf8', token: '$gp-50' },
					{ shade: '#e2f8ef', token: '$gp-100' },
					{ shade: '#abedd3', token: '$gp-200' },
					{ shade: '#6ddfb1', token: '$gp-300' },
					{ shade: '#2db981', token: '$gp-400' }
				]
			}
		];
	})
}));

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

describe('PieChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(PieChart, {
			props: {
				labels: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio'],
				variant: 'green',
				data: mockedData,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('it accepts valid colors', () => {
		const validator = PieChart.props.colors.validator;
		const invalidColors = [...mockedColors, 'silver'];
		expect(validator(mockedColors)).toBe(true);
		expect(validator(invalidColors)).toBe(false);
	});
});
