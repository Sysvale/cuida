import { describe, test, expect } from 'vitest';
import Radio from '../components/Radio.vue';
import { mount } from '@vue/test-utils';

describe('Radio', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Radio, {
			props: {
				modelValue: null,
				value: 'option-1',
				label: 'Opção 1',
			},
		});

		expect(wrapper).toMatchSnapshot();
	});
});
