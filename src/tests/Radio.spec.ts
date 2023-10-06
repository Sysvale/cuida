import { describe, test, expect, vi } from 'vitest';
import Radio from '../components/Radio.vue';
import { mount } from '@vue/test-utils';

describe('Radio', () => {
	test('renders correctly', async () => {
		Math.random = vi.fn(() => 0.1);

		const wrapper = mount(Radio, {
			props: {
				modelValue: null,
				value: 'option-1',
				label: 'Opção 1',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
