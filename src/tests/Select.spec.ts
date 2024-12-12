import { describe, test, expect } from 'vitest';
import Select from '../components/Select.vue';
import { shallowMount } from '@vue/test-utils';

const options = [
	{
		value: 'foo',
		id: 1,
		text: 'fancy foo text',
	},
	{
		value: 'bar',
		id: 2,
		text: 'fancy bar text',
	},
];

const value = {};

describe('Select', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(Select, {
			props: {
				label: 'Label',
				options,
				modelValue: value,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
