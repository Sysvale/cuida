import { describe, test, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DateInput from '../components/DateInput.vue'; // Ajuste o caminho conforme necessário
import CdsBaseInput from '../components/BaseInput.vue';
import { DateTime } from 'luxon';

describe('DateInput', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(DateInput, {
			props: {
				label: 'Selecione uma data',
				placeholder: 'dd/MM/yyyy',
				id: 'text-input',
			},
		});
	});

	test('renders correctly', () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('renders correctly with default props', () => {
		expect(wrapper.findComponent(CdsBaseInput).exists()).toBe(true);
		expect(wrapper.findComponent(CdsBaseInput).props('label')).toBe('Selecione uma data');
		expect(wrapper.findComponent(CdsBaseInput).props('placeholder')).toBe('dd/MM/yyyy');
	});

	test('renders with a required indicator', () => {
		wrapper = mount(DateInput, {
			props: {
				label: 'Selecione uma data',
				required: true,
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('required')).toBe(true);
	});

	test('renders with disabled attribute when disabled prop is true', () => {
		wrapper = mount(DateInput, {
			props: {
				label: 'Selecione uma data',
				disabled: true,
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('disabled')).toBe(true);
	});

	test('does not render with disabled attribute when disabled prop is false', () => {
		wrapper = mount(DateInput, {
			props: {
				label: 'Selecione uma data',
				disabled: false,
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('disabled')).toBe(false);
	});

	test('renders with a custom label', () => {
		wrapper = mount(DateInput, {
			props: {
				label: 'Data Personalizada',
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('label')).toBe('Data Personalizada');
	});

	test('renders with a support link', () => {
		wrapper = mount(DateInput, {
			props: {
				label: 'Selecione uma data',
				supportLink: 'Support Link',
				supportLinkUrl: 'https://example.com',
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('supportLink')).toBe('Support Link');
		expect(wrapper.findComponent(CdsBaseInput).props('supportLinkUrl')).toBe('https://example.com');
	});

	test('renders with a floating label when floatingLabel prop is true', () => {
		wrapper = mount(DateInput, {
			props: {
				label: 'Selecione uma data',
				floatingLabel: true,
			},
		});

		expect(wrapper.findComponent(CdsBaseInput).props('floatingLabel')).toBe(true);
	});
});
