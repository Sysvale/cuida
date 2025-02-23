import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Select from '../components/Select.vue';
import CdsBaseInput from '../components/BaseInput.vue';

describe('Select', () => {
	test('renders correctly', () => {
		const wrapper = mount(Select, {
			props: {
				id: 'select-input',
				label: 'label',
				options: [
					{ value: 'Option 1' },
					{ value: 'Option 2' }
				],
				modelValue: {},
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('renders correctly with default props', () => {
		const wrapper = mount(Select, {
			props: {
				id: 'select-input',
				options: [{ value: 'Option 1' }, { value: 'Option 2' }],
				modelValue: {},
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).exists()).toBe(true);
		expect(wrapper.findComponent(CdsBaseInput).props('label')).toBe('Label');
		expect(wrapper.findComponent(CdsBaseInput).props('placeholder')).toBe('Selecione...');
	});

	test('renders with a required indicator', () => {
		const wrapper = mount(Select, {
			props: {
				label: 'label',
				id: 'select-input',
				options: [{ value: 'Option 1' }, { value: 'Option 2' }],
				required: true,
				modelValue: {},
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('required')).toBe(true);
	});

	test('renders with disabled attribute when disabled prop is true', () => {
		const wrapper = mount(Select, {
			props: {
				label: 'label',
				id: 'select-input',
				options: [{ value: 'Option 1' }, { value: 'Option 2' }],
				disabled: true,
				modelValue: {},
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('disabled')).toBe(true);
	});

	test('does not render with disabled attribute when disabled prop is false', () => {
		const wrapper = mount(Select, {
			props: {
				label: 'label',
				id: 'select-input',
				options: [{ value: 'Option 1' }, { value: 'Option 2' }],
				disabled: false,
				modelValue: {},
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('disabled')).toBe(false);
	});

	test('applies fluid class and styles when fluid prop is true', () => {
		const wrapper = mount(Select, {
			props: {
				label: 'label',
				id: 'select-input',
				options: [{ value: 'Option 1' }, { value: 'Option 2' }],
				fluid: true,
				modelValue: {},
			},
		});

		expect(wrapper.find('.select__container--fluid').exists()).toBe(true);
	});

	test('renders with a custom label', () => {
		const wrapper = mount(Select, {
			props: {
				id: 'select-input',
				options: [{ value: 'Option 1' }, { value: 'Option 2' }],
				label: 'Custom Label',
				modelValue: {},
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('label')).toBe('Custom Label');
	});

	test('renders with a support link', () => {
		const wrapper = mount(Select, {
			props: {
				label: 'label',
				id: 'select-input',
				options: [{ value: 'Option 1' }, { value: 'Option 2' }],
				supportLink: 'Support Link',
				supportLinkUrl: 'https://example.com',
				modelValue: {},
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('supportLink')).toBe('Support Link');
		expect(wrapper.findComponent(CdsBaseInput).props('supportLinkUrl')).toBe('https://example.com');
	});

	test('renders with a floating label when floatingLabel prop is true', () => {
		const wrapper = mount(Select, {
			props: {
				label: 'label',
				id: 'select-input',
				options: [{ value: 'Option 1' }, { value: 'Option 2' }],
				floatingLabel: true,
				modelValue: {},
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('floatingLabel')).toBe(true);
	});

	test('updates the model value when an option is selected', async () => {
		const wrapper = mount(Select, {
			props: {
				label: 'label',
				id: 'select-input',
				options: [{ value: 'Option 1' }, { value: 'Option 2' }],
				modelValue: {},
			},
		});

		await wrapper.find('.option__text').trigger('mousedown');
		expect(wrapper.vm.localValue.value).toBe('Option 1');
	});

	test('filters options based on search input', async () => {
		const wrapper = mount(Select, {
			props: {
				label: 'label',
				id: 'select-input',
				options: [{ value: 'Option 1' }, { value: 'Option 2' }],
				searchable: true,
				modelValue: {},
			},
		});

		await wrapper.find('input').setValue('Option 1');
		await wrapper.findComponent(CdsBaseInput).trigger('input');
		expect(wrapper.vm.localOptions.length).toBe(1);
		expect(wrapper.vm.localOptions[0].value).toBe('Option 1');
	});

	test('hides options when input is blurred', async () => {
		const wrapper = mount(Select, {
			props: {
				label: 'label',
				id: 'select-input',
				options: [{ value: 'Option 1' }, { value: 'Option 2' }],
				modelValue: {},
			},
		});

		await wrapper.find('input').trigger('click');
		expect(wrapper.vm.active).toBe(true);

		await wrapper.find('input').trigger('blur');
		expect(wrapper.vm.active).toBe(false);
	});
});
