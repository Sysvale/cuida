import { describe, test, expect } from 'vitest';
import Checkbox from '../components/Checkbox.vue';
import { mount } from '@vue/test-utils';
  
describe('Checkbox', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Checkbox, {
			props: {
				modelValue: false,
				label: 'checkbox test',
			},
		});
  
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('renders append slot content', () => {
		const wrapper = mount(Checkbox, {
			props: {
				modelValue: false,
				label: 'checkbox test',
			},
			slots: {
				append: '<span class="test-append">append content</span>',
			},
		});

		expect(wrapper.find('.test-append').exists()).toBe(true);
		expect(wrapper.find('.test-append').text()).toBe('append content');
	});
});

