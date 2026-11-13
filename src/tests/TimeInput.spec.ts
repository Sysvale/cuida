import { describe, test, expect } from 'vitest';
import TimeInput from '../components/TimeInput.vue';
import { mount } from '@vue/test-utils';

describe('TimeInput', () => {
	test('renders correctly', async () => {
		const wrapper = mount(TimeInput, {
			props: {
				label: 'Test label',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('uses "00" as default placeholder for hour and minute inputs', () => {
		const wrapper = mount(TimeInput, {
			props: { label: 'Horário' },
		});

		const inputs = wrapper.findAll('input');
		inputs.forEach((input) => {
			expect(input.attributes('placeholder')).toBe('00');
		});
	});

	test('applies custom hourPlaceholder to hour inputs', () => {
		const wrapper = mount(TimeInput, {
			props: {
				label: 'Horário',
				hourPlaceholder: 'HH',
			},
		});

		const hourInputs = wrapper.findAll('input[type="text"]').filter(
			(_, i) => i % 2 === 0,
		);

		hourInputs.forEach((input) => {
			expect(input.attributes('placeholder')).toBe('HH');
		});
	});

	test('applies custom minutePlaceholder to minute inputs', () => {
		const wrapper = mount(TimeInput, {
			props: {
				label: 'Horário',
				minutePlaceholder: 'mm',
			},
		});

		const minuteInputs = wrapper.findAll('input[type="text"]').filter(
			(_, i) => i % 2 !== 0,
		);

		minuteInputs.forEach((input) => {
			expect(input.attributes('placeholder')).toBe('mm');
		});
	});

	test('supports different placeholders for hour and minute simultaneously', () => {
		const wrapper = mount(TimeInput, {
			props: {
				label: 'Horário',
				hourPlaceholder: 'HH',
				minutePlaceholder: 'mm',
			},
		});

		const inputs = wrapper.findAll('input[type="text"]');

		expect(inputs[0].attributes('placeholder')).toBe('HH');
		expect(inputs[1].attributes('placeholder')).toBe('mm');
	});

	test('applies placeholders to range mode inputs as well', () => {
		const wrapper = mount(TimeInput, {
			props: {
				label: 'Horário',
				mode: 'range',
				hourPlaceholder: 'HH',
				minutePlaceholder: 'mm',
			},
		});

		const inputs = wrapper.findAll('input[type="text"]');

		expect(inputs[0].attributes('placeholder')).toBe('HH');
		expect(inputs[1].attributes('placeholder')).toBe('mm');
		expect(inputs[2].attributes('placeholder')).toBe('HH');
		expect(inputs[3].attributes('placeholder')).toBe('mm');
	});
});

