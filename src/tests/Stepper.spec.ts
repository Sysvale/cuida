import { describe, test, expect } from 'vitest';
import Stepper from '../components/Stepper.vue';
import { mount } from '@vue/test-utils';

const mocked_data = [
	{
		label: 'Dummy label 1',
		completed: true,
		inProcessing: false,
		error: false,
	},
	{
		label: 'Dummy label 3',
		completed: false,
		inProcessing: true,
		error: false,
	},
	{
		label: 'Dummy label 2',
		completed: false,
		inProcessing: false,
		error: true,
	},
	{
		label: 'Dummy label X',
		completed: false,
		inProcessing: false,
		error: false,
	},
];

describe('Stepper', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Stepper, {
			props: {
				value: 4,
				steps: mocked_data,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
