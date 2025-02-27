import { describe, test, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import DateInput from '@/components/DateInput.vue'; // Ajuste o caminho conforme necessário
import { DateTime } from 'luxon';

describe('DateInput.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(DateInput, {
			props: {
				label: 'Selecione uma data',
				placeholder: 'dd/MM/yyyy',
			},
		});
	});

	test('renderiza corretamente', () => {
		expect(wrapper.find('.date-input').exists()).toBe(true);
		expect(wrapper.find('input').attributes('placeholder')).toBe('dd/MM/yyyy');
	});

	test('abre e fecha o calendário ao clicar no input', async () => {
		await wrapper.find('input').trigger('click');
		expect(wrapper.find('.date-input__calendar').exists()).toBe(true);

		await wrapper.find('input').trigger('click');
		expect(wrapper.find('.date-input__calendar').exists()).toBe(false);
	});

	test('navega entre os meses', async () => {
		await wrapper.find('input').trigger('click');
		const currentMonth = wrapper.find('.calendar__month-and-title').text();

		await wrapper.find('.calendar__right-caret').trigger('click');
		const nextMonth = wrapper.find('.calendar__month-and-title').text();
		expect(nextMonth).not.toBe(currentMonth);

		await wrapper.find('.calendar__left-caret').trigger('click');
		expect(wrapper.find('.calendar__month-and-title').text()).toBe(currentMonth);
	});

	test('seleciona uma data', async () => {
		await wrapper.find('input').trigger('click');
		const today = DateTime.now().day;

		await wrapper.find(`.calendar__day:not(.disabled-day)`).trigger('click');
		expect(wrapper.find('input').element.value).toBe(DateTime.now().toFormat('dd/MM/yyyy'));
	});

	test('desabilita datas fora do intervalo permitido', async () => {
		await wrapper.setProps({ minDate: '2023-10-01', maxDate: '2023-10-31' });
		await wrapper.find('input').trigger('click');

		const disabledDays = wrapper.findAll('.disabled-day');
		expect(disabledDays.length).toBeGreaterThan(0);

		const firstDisabledDay = disabledDays[0];
		await firstDisabledDay.trigger('click');
		expect(wrapper.find('input').element.value).not.toBe(firstDisabledDay.text());
	});

	test('seleciona um intervalo de datas', async () => {
		await wrapper.setProps({ range: true });
		await wrapper.find('input').trigger('click');

		const startDay = wrapper.find('.calendar__day:not(.disabled-day)');
		await startDay.trigger('click');

		const endDay = wrapper.findAll('.calendar__day:not(.disabled-day)')[5];
		await endDay.trigger('click');

		const startDate = DateTime.now().toFormat('dd/MM/yyyy');
		const endDate = DateTime.now().plus({ days: 5 }).toFormat('dd/MM/yyyy');
		expect(wrapper.find('input').element.value).toBe(`De ${startDate} a ${endDate}`);
	});
});