import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TextInput from '../components/TextInput.vue';
import CdsBaseInput from '../components/BaseInput.vue';

describe('TextInput', () => {
	test('renders correctly', () => {
		const wrapper = mount(TextInput, {
			props: {
				id: 'text-input',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('renders correctly with default props', () => {
		const wrapper = mount(TextInput, {
			props: {
				id: 'text-input',
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).exists()).toBe(true);
		expect(wrapper.findComponent(CdsBaseInput).props('label')).toBe('Label');
		expect(wrapper.findComponent(CdsBaseInput).props('placeholder')).toBe('Digite aqui a informação');
	});

	test('renders with a required indicator', () => {
		const wrapper = mount(TextInput, {
			props: {
				id: 'text-input',
				required: true,
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('required')).toBe(true);
	});

	test('renders with disabled attribute when disabled prop is true', () => {
		const wrapper = mount(TextInput, {
			props: {
				id: 'text-input',
				disabled: true,
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('disabled')).toBe(true);
	});

	test('does not render with disabled attribute when disabled prop is false', () => {
		const wrapper = mount(TextInput, {
			props: {
				id: 'text-input',
				disabled: false,
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('disabled')).toBe(false);
	});

	test('applies fluid class and styles when fluid prop is true', () => {
		const wrapper = mount(TextInput, {
			props: {
				id: 'text-input',
				fluid: true,
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('fluid')).toBe(true);
	});

	test('renders with a custom label', () => {
		const wrapper = mount(TextInput, {
			props: {
				id: 'text-input',
				label: 'Custom Label',
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('label')).toBe('Custom Label');
	});

	test('renders with a support link', () => {
		const wrapper = mount(TextInput, {
			props: {
				id: 'text-input',
				supportLink: 'Support Link',
				supportLinkUrl: 'https://example.com',
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('supportLink')).toBe('Support Link');
		expect(wrapper.findComponent(CdsBaseInput).props('supportLinkUrl')).toBe('https://example.com');
	});

	test('renders with a floating label when floatingLabel prop is true', () => {
		const wrapper = mount(TextInput, {
			props: {
				id: 'text-input',
				floatingLabel: true,
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('floatingLabel')).toBe(true);
	});

	test('updates the model value when input changes', async () => {
		const wrapper = mount(TextInput, {
			props: {
				id: 'text-input',
			},
		});

		const baseInput = wrapper.findComponent(CdsBaseInput);
		await baseInput.setValue('new value');
		expect(wrapper.vm.internalValue).toBe('new value');
	});
});