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

	test('renders custom content in append slot using scoped slot', () => {
		const wrapper = mount(CheckboxGroup, {
			props: {
				modelValue: [],
				label: 'Checkbox Group Test',
				options: [
					{
						value: 'test-1',
						label: 'Teste 1',
						customData: 'Custom 1',
					},
					{
						value: 'test-2',
						label: 'Teste 2',
						customData: 'Custom 2',
					},
				],
			},
			slots: {
				append: `<template #append="{ option }">
					<span class="custom-append">{{ option.customData }}</span>
				</template>`,
			},
		});

		const customAppends = wrapper.findAll('.custom-append');
		expect(customAppends.length).toBe(2);
		expect(customAppends[0].text()).toBe('Custom 1');
		expect(customAppends[1].text()).toBe('Custom 2');
	});
});

