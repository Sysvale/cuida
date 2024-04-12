import { describe, test, expect } from 'vitest';
import PasswordInput from '../components/PasswordInput.vue';
import { mount } from '@vue/test-utils';

describe('PasswordInput', () => {
	test('If component renders correctly', () => {
		const wrapper = mount(PasswordInput, {
			props: {},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});

