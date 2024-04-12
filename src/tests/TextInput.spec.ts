import { describe, test, expect } from 'vitest';
import TextInput from '../components/TextInput.vue';
import { mount } from '@vue/test-utils';

describe('TextInput', () => {
	test('renders correctly', async () => {
		const wrapper = mount(TextInput, {
			props: {},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
