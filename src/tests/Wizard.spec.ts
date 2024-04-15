import { describe, test, expect } from 'vitest';
import Wizard from '../components/Wizard.vue';
import { mount } from '@vue/test-utils';

const mockedSteps = [
	{
		title: 'Dummy title 1',
		subtitle: 'Dummy subtitle 1',
		completed: true,
		inProcessing: false,
		error: false,
	},
	{
		title: 'Dummy title 2',
		subtitle: 'Dummy subtitle 2',
		completed: false,
		inProcessing: false,
		error: true,
	},
	{
		title: 'Dummy title 3',
		subtitle: 'Dummy subtitle 3',
		completed: false,
		inProcessing: true,
		error: false,
	},
];

describe('Wizard', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Wizard, {
			props: {
				steps: mockedSteps,
			},
			slots: {
				'step-1-header': 'Dummy title without subtitle',
				'step-1': '<p>Dummy content 1</p>',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('it accepts valid steps length', () => {
		const validator = Wizard.props.steps.validator;
		const invalidSteps = [...mockedSteps, {}];
		expect(validator(mockedSteps)).toBe(true);
		expect(validator(invalidSteps)).toBe(false);
	});
});
