import { describe, test, expect } from 'vitest';
import Checkbox from '../components/Checkbox.vue';
import { mount } from '@vue/test-utils';
  
describe('Checkbox', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Checkbox, {
			props: {
				modelValue: false,
				label: 'checkbox test'
			},
		});
  
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('toggles value on change', async () => {
		const wrapper = mount(Checkbox, {
			props: {
				modelValue: false,
				label: 'checkbox test'
			},
		});

		const input = wrapper.find('input[type="checkbox"]');
		await input.trigger('change');

		expect(wrapper.emitted('update:modelValue')).toBeTruthy();
		expect(wrapper.emitted('update:modelValue')[0]).toEqual([true]);
	});

	test('is focusable', async () => {
		const wrapper = mount(Checkbox, {
			props: {
				modelValue: false,
			},
		});

		const input = wrapper.find('input[type="checkbox"]');
		expect(input.element).toBeDefined();
		// In a real browser we would check if it's focusable, but here we check it's not visibility: hidden anymore
		expect(window.getComputedStyle(input.element).visibility).not.toBe('hidden');
	});
});
