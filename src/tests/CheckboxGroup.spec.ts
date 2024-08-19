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
});
