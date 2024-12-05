import { describe, test, expect } from 'vitest';
import WebcamModal from '../components/WebcamModal.vue';
import { mount } from '@vue/test-utils';

describe('WebcamModal', () => {
	test('renders correctly', async () => {
		const wrapper = mount(WebcamModal, {
			props: {
				modelValue: true,
				title: 'Olá, camera!',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
