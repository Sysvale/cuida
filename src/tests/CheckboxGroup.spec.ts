import { describe, test, expect } from 'vitest';
import CheckboxGroup from '../components/CheckboxGroup.vue';
import CheckboxItem from '../components/Checkbox.vue';
import { mount } from '@vue/test-utils';
  
describe('CheckboxGroup', () => {
	test('renders correctly', async () => {
		const wrapper = mount(CheckboxGroup, {
			props: {
				modelValue: ['test-1'],
				label: 'Checkbox Group Test',
				options: [
					{
						value: 'test-1',
						label: 'Teste 1',
					},
					{
						value: 'test-2',
						label: 'Teste 2',
					},
				],
			},
		});
  
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('checkbox options are rendered correctly', async () => {
		expect.assertions(2);

		const wrapper = await mount(CheckboxGroup, {
			props: {
				modelValue: ['test-1'],
				label: 'Checkbox Group Test',
				options: [
					{
						value: 'test-1',
						label: 'Teste 1',
					},
					{
						value: 'test-2',
						label: 'Teste 2',
					},
				],
			},
		});

		const checkboxArray = wrapper.findAllComponents(CheckboxItem);
		const checkedCheckbox = checkboxArray.find((checkbox) => checkbox.vm.label === 'Teste 1');

		expect(checkboxArray.length).toBe(2);
		expect(checkedCheckbox?.vm.modelValue).toBeTruthy();
	});

	test('renders dynamic append slots for specific checkboxes', async () => {
		const wrapper = mount(CheckboxGroup, {
			props: {
				modelValue: [],
				label: 'Checkbox Group Test',
				options: [
					{
						value: 'test-1',
						label: 'Teste 1',
					},
					{
						value: 'test-2',
						label: 'Teste 2',
					},
				],
			},
			slots: {
				'append-test-1': '<span class="custom-append-1">Append 1</span>',
			},
		});

		const appendElement = wrapper.find('.custom-append-1');
		expect(appendElement.exists()).toBe(true);
		expect(appendElement.text()).toBe('Append 1');

		const checkboxArray = wrapper.findAllComponents(CheckboxItem);
		expect(checkboxArray.at(1)?.find('.custom-append-1').exists()).toBe(false);
	});

	test('renders scoped general append slot for all checkboxes', async () => {
		const wrapper = mount(CheckboxGroup, {
			props: {
				modelValue: [],
				label: 'Checkbox Group Test',
				options: [
					{
						value: 'test-1',
						label: 'Teste 1',
					},
					{
						value: 'test-2',
						label: 'Teste 2',
					},
				],
			},
			slots: {
				append: `
					<template #append="{ option }">
						<span class="custom-append-generic">{{ option.value }}-suffix</span>
					</template>
				`,
			},
		});

		const appendElements = wrapper.findAll('.custom-append-generic');
		expect(appendElements.length).toBe(2);
		expect(appendElements.at(0)?.text()).toBe('test-1-suffix');
		expect(appendElements.at(1)?.text()).toBe('test-2-suffix');
	});
});

