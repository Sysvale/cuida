import { describe, test, expect } from 'vitest';
import WebcamInput from '../components/WebcamInput.vue';
import { mount } from '@vue/test-utils';

describe('WebcamInput', () => {
	test('renders correctly', async () => {
		const wrapper = mount(WebcamInput, {
			props: {
				modelValue: true,
				title: 'Olá, camera!',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
