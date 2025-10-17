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

	describe('Disabled state with keyboard interaction', () => {
		test('should not change state when disabled and Space is pressed', async () => {
			const wrapper = mount(Checkbox, {
				props: {
					modelValue: false,
					label: 'checkbox test',
					disabled: true,
				},
			});

			const input = wrapper.find('input[type="checkbox"]');
			const initialState = wrapper.vm.isChecked;

			// Simula pressionar Space - o navegador tenta alterar o estado
			input.element.checked = !input.element.checked;
			await input.trigger('change');
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.isChecked).toBe(initialState);
			expect(input.element.checked).toBe(initialState);
		});

		test('should not emit update:modelValue when disabled and Space is pressed', async () => {
			const wrapper = mount(Checkbox, {
				props: {
					modelValue: false,
					label: 'checkbox test',
					disabled: true,
				},
			});

			const input = wrapper.find('input[type="checkbox"]');

			// Simula pressionar Space - o navegador tenta alterar o estado
			input.element.checked = !input.element.checked;
			await input.trigger('change');
			await wrapper.vm.$nextTick();

			expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		});

		test('should not change state when disabled and clicked', async () => {
			const wrapper = mount(Checkbox, {
				props: {
					modelValue: false,
					label: 'checkbox test',
					disabled: true,
				},
			});

			const input = wrapper.find('input[type="checkbox"]');
			const initialState = wrapper.vm.isChecked;

			// Simula clique no input - o navegador tenta alterar o estado
			input.element.checked = !input.element.checked;
			await input.trigger('click');
			await input.trigger('change');
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.isChecked).toBe(initialState);
			expect(input.element.checked).toBe(initialState);
		});

		test('should change state when enabled and Space is pressed', async () => {
			const wrapper = mount(Checkbox, {
				props: {
					modelValue: false,
					label: 'checkbox test',
					disabled: false,
				},
			});

			const input = wrapper.find('input[type="checkbox"]');

			// Simula pressionar Space - o navegador altera o estado
			input.element.checked = true;
			await input.trigger('change');
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.isChecked).toBe(true);
			expect(input.element.checked).toBe(true);
		});

		test('should change state when enabled and clicked', async () => {
			const wrapper = mount(Checkbox, {
				props: {
					modelValue: false,
					label: 'checkbox test',
					disabled: false,
				},
			});

			const input = wrapper.find('input[type="checkbox"]');

			// Simula clique no input
			await input.trigger('click');
			await input.trigger('change');
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.isChecked).toBe(true);
			expect(input.element.checked).toBe(true);
		});

		test('should have tabindex -1 when disabled', async () => {
			const wrapper = mount(Checkbox, {
				props: {
					modelValue: false,
					label: 'checkbox test',
					disabled: true,
				},
			});

			const input = wrapper.find('input[type="checkbox"]');
			expect(input.attributes('tabindex')).toBe('-1');
		});

		test('should have tabindex 0 when enabled', async () => {
			const wrapper = mount(Checkbox, {
				props: {
					modelValue: false,
					label: 'checkbox test',
					disabled: false,
				},
			});

			const input = wrapper.find('input[type="checkbox"]');
			expect(input.attributes('tabindex')).toBe('0');
		});
	});
});