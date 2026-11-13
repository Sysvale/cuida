import { describe, test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CdsNumberInput from '../components/NumberInput.vue';
import CdsBaseInput from '../components/BaseInput.vue';

describe('CdsNumberInput', () => {
	test('renders correctly', () => {
		const wrapper = mount(CdsNumberInput, {
			props: {
				id: 'number-input',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('renders correctly with default props', () => {
		const wrapper = mount(CdsNumberInput, {
			props: {
				id: 'number-input',
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).exists()).toBe(true);
		expect(wrapper.findComponent(CdsBaseInput).props('label')).toBe('Valor');
		expect(wrapper.findComponent(CdsBaseInput).props('placeholder')).toBe('Digite aqui a informação');
	});

	test('renders with a custom label', () => {
		const wrapper = mount(CdsNumberInput, {
			props: {
				id: 'number-input',
				label: 'Custom Label',
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('label')).toBe('Custom Label');
	});

	test('renders with a custom placeholder', () => {
		const wrapper = mount(CdsNumberInput, {
			props: {
				id: 'number-input',
				placeholder: 'Custom Placeholder',
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('placeholder')).toBe('Custom Placeholder');
	});

	test('renders with a required indicator', () => {
		const wrapper = mount(CdsNumberInput, {
			props: {
				id: 'number-input',
				required: true,
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('required')).toBe(true);
	});

	test('renders with a disabled attribute when disabled prop is true', () => {
		const wrapper = mount(CdsNumberInput, {
			props: {
				id: 'number-input',
				disabled: true,
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('disabled')).toBe(true);
	});

	test('renders with a floating label when mobile prop is true', () => {
		const wrapper = mount(CdsNumberInput, {
			props: {
				id: 'number-input',
				mobile: true,
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('floatingLabel')).toBe(true);
	});

	test('applies money mask and updates internal state correctly', async () => {
		const wrapper = mount(CdsNumberInput, {
			props: {
				id: 'number-input',
				money: true,
				modelValue: 0,
			},
		});

		const input = wrapper.find('input');

		input.element.value = '123456';
		await input.trigger('input');

		expect(wrapper.vm.model).toMatch(/R\$[\s\u00A0]1\.234,56/);
		expect(wrapper.vm.unmaskedValue).toBe(1234.56);
	});

	test('should select all text on focus when money prop is true', async () => {
		vi.useFakeTimers();
		const wrapper = mount(CdsNumberInput, {
			props: {
				id: 'number-input',
				money: true,
				modelValue: 50,
			},
		});

		const baseInput = wrapper.findComponent({ ref: 'baseInput' });
		const selectSpy = vi.spyOn(baseInput.vm, 'select');

		const input = wrapper.find('input');
		await input.trigger('focus');

		vi.runAllTimers();

		expect(selectSpy).toHaveBeenCalled();
		vi.useRealTimers();
	});

	test('should keep R$ 0,00 when trying to delete characters in Firefox-like scenario', async () => {
		const wrapper = mount(CdsNumberInput, {
			props: {
				money: true,
				modelValue: 0,
			},
		});

		const input = wrapper.find('input');
		
		input.element.value = 'R$ 0,0';
		await input.trigger('input');
		
		await nextTick();
		await nextTick();

		expect(input.element.value).toMatch(/R\$[\s\u00A0]0,00/);
	});
});
