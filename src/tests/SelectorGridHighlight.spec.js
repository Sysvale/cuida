import { describe, test, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MonthSelectorGrid from '../components/InternalComponents/MonthSelectorGrid.vue';
import YearSelectorGrid from '../components/InternalComponents/YearSelectorGrid.vue';

describe('SelectorGrid Highlight Fix', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2026, 1, 10)); // Feb 10, 2026
	});

	describe('MonthSelectorGrid', () => {
		test('no month should be highlighted when selectedDate is empty', () => {
			const wrapper = mount(MonthSelectorGrid, {
				props: {
					selectedDate: '',
				},
			});
			const selectedMonths = wrapper.findAll('.month-selector__month--selected--green');
			expect(selectedMonths.length).toBe(0);
		});

		test('correct month should be highlighted when selectedDate is provided', () => {
			const wrapper = mount(MonthSelectorGrid, {
				props: {
					selectedDate: '2025-05-15',
				},
			});
			// May is index 4 (0-based) in MONTHS array, so it's the 5th element
			const months = wrapper.findAll('.month-selector__month');
			expect(months[4].classes()).toContain('month-selector__month--selected--green');

			const selectedMonths = wrapper.findAll('[class*="month-selector__month--selected--"]');
			expect(selectedMonths.length).toBe(1);
		});
	});

	describe('YearSelectorGrid', () => {
		test('no year should be highlighted when selectedDate is empty', () => {
			const wrapper = mount(YearSelectorGrid, {
				props: {
					selectedDate: '',
				},
			});
			const selectedYears = wrapper.findAll('.year-selector__year--selected--green');
			expect(selectedYears.length).toBe(0);
		});

		test('correct year should be highlighted when selectedDate is provided', () => {
			const wrapper = mount(YearSelectorGrid, {
				props: {
					selectedDate: '2025-05-15',
				},
			});
			const selectedYears = wrapper.findAll('.year-selector__year--selected--green');
			expect(selectedYears.length).toBe(1);
			expect(selectedYears[0].text()).toBe('2025');
		});
	});
});
