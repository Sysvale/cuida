import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CdsNumberInput from '../components/NumberInput.vue';
import CdsBaseInput from '../components/BaseInput.vue';
import { vCdsBrl } from '../utils/directives/cdsBRL';


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
			global: {
				directives: {
					CdsBrl: vCdsBrl, // Registre a diretiva
				},
			},
			props: {
				id: 'number-input',
				money: true,
			},
		});

		await wrapper.vm.$nextTick();

		const input = wrapper.find('input');

		await input.setValue('123456');

		expect(wrapper.vm.model).toMatch(/R\$[\s\u00A0]1\.234,56/);
		expect(wrapper.vm.unmaskedValue).toBe(1234.56);
	});
});