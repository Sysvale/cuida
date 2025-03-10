import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DynamicInputList from '../components/DynamicInputList.vue'; // Ajuste o caminho conforme necessário
import CdsTextInput from '../components/TextInput.vue';
import CdsFlatButton from '../components/FlatButton.vue';
import CdsIcon from '../components/Icon.vue';

describe('DynamicInputList', () => {
	test('renders the correct number of inputs based on modelValue', () => {
		const wrapper = mount(DynamicInputList, {
			props: {
				modelValue: [
					{ label: 'Option 1', value: '1' },
					{ label: 'Option 2', value: '2' },
				],
			},
		});

		const inputs = wrapper.findAllComponents(CdsTextInput);
		expect(inputs.length).toBe(2);
	});

	test('adds a new input when the add button is clicked and last input is not empty', async () => {
		const wrapper = mount(DynamicInputList, {
			props: {
				modelValue: [
					{ label: 'Option 1', value: '1' },
				],
			},
		});

		const initialInputs = wrapper.findAllComponents(CdsTextInput);
		expect(initialInputs.length).toBe(1);

		await wrapper.findComponent(CdsFlatButton).trigger('click');

		const updatedInputs = wrapper.findAllComponents(CdsTextInput);
		expect(updatedInputs.length).toBe(2);
	});

	test('does not add a new input when the last input is empty', async () => {
		const wrapper = mount(DynamicInputList, {
			props: {
				modelValue: [
					{ label: '', value: '1' },
				],
			},
		});

		const initialInputs = wrapper.findAllComponents(CdsTextInput);
		expect(initialInputs.length).toBe(1);

		await wrapper.findComponent(CdsFlatButton).trigger('click');

		const updatedInputs = wrapper.findAllComponents(CdsTextInput);
		expect(updatedInputs.length).toBe(1);
		expect(wrapper.vm.triedToAddInput).toBe(true);
	});

	test('removes an input when the remove button is clicked', async () => {
		const wrapper = mount(DynamicInputList, {
			props: {
				modelValue: [
					{ label: 'Option 1', value: '1' },
					{ label: 'Option 2', value: '2' },
				],
			},
		});

		const initialInputs = wrapper.findAllComponents(CdsTextInput);
		expect(initialInputs.length).toBe(2);

		await wrapper.findComponent(CdsIcon).trigger('click');

		const updatedInputs = wrapper.findAllComponents(CdsTextInput);
		expect(updatedInputs.length).toBe(1);
	});

	test('updates the modelValue when an input value changes', async () => {
		const wrapper = mount(DynamicInputList, {
			props: {
				modelValue: [
					{ label: 'Option 1', value: '1' },
				],
			},
		});

		const input = wrapper.findComponent(CdsTextInput);
		await input.setValue('New Option');

		expect(wrapper.vm.internalModel[0].label).toBe('New Option');
	});

	test('exposes the arrayOfValues method', () => {
		const wrapper = mount(DynamicInputList, {
			props: {
				modelValue: [
					{ label: 'Option 1', value: '1' },
					{ label: 'Option 2', value: '2' },
				],
			},
		});

		const values = wrapper.vm.arrayOfValues();
		expect(values).toEqual(['Option 1', 'Option 2']);
	});
});
