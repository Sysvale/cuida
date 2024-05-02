import { describe, test, expect } from 'vitest';
import Scrollable from '../components/Scrollable.vue';
import { mount } from '@vue/test-utils';

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

describe('Scrollable', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Scrollable, {
			props: {
				label: 'Label',
				options,
				value,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
