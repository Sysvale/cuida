
import { describe, test, expect } from 'vitest';
import TextInput from '../components/TextInput.vue';
import { mount } from '@vue/test-utils';

const fields = ['field1', 'field2', 'field3'];

describe('TextInput', () => {
	test('renders correctly', async () => {
		const wrapper = mount(TextInput, {
			props: {
				fields,
				items: [
					{
						field1: 'field 1 content',
						field2: 'field 2 content',
						field3: 'field 3 content',
					},
					{
						field1: 'field 1 content',
						field2: 'field 2 content',
						field3: 'field 3 content',
					},
				],
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
