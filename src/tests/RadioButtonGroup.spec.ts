import { describe, test, expect } from 'vitest';
import RadioButtonGroup from '../components/RadioButtonGroup.vue';
import { mount } from '@vue/test-utils';

const options = [
	{
		text: 'Component1',
		value: 'value1',
		disabled: true,
	},
	{
		text: 'Component2',
		value: 'value2',
	},
	{
		text: 'Component3',
		value: 'value3',
	},
];

describe('RadioButtonGroup', () => {
	test('renders correctly', async () => {
		const wrapper = mount(RadioButtonGroup, {
			props: {
				modelValue: null,
				value: '',
				options,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
