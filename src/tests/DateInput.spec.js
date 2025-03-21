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

	test('opens and closes the calendar when clicking the input', async () => {
		await wrapper.find('input').trigger('click');
		expect(wrapper.find('.date-input__calendar').exists()).toBe(true);

		await wrapper.find('input').trigger('click');
		expect(wrapper.find('.date-input__calendar').exists()).toBe(false);
	});

	test('navigates between months', async () => {
		await wrapper.find('input').trigger('click');
		const currentMonth = wrapper.find('.calendar__month-and-title').text();

		await wrapper.find('.calendar__right-caret').trigger('click');
		const nextMonth = wrapper.find('.calendar__month-and-title').text();
		expect(nextMonth).not.toBe(currentMonth);

		await wrapper.find('.calendar__left-caret').trigger('click');
		expect(wrapper.find('.calendar__month-and-title').text()).toBe(currentMonth);
	});

	test('disables dates outside the allowed range', async () => {
		await wrapper.setProps({ minDate: '2023-10-01', maxDate: '2023-10-31' });
		await wrapper.find('input').trigger('click');

		const disabledDays = wrapper.findAll('.disabled-day');
		expect(disabledDays.length).toBeGreaterThan(0);

		const firstDisabledDay = disabledDays[0];
		await firstDisabledDay.trigger('click');
		expect(wrapper.find('input').element.value).not.toBe(firstDisabledDay.text());
	});
});
