import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import TimeInput from '../../src/components/TimeInput.vue';

const localVue = createLocalVue();

describe('TimeInput', () => {
	test('if component renders correctly', async () => {
		const wrapper = shallowMount(TimeInput, {
			localVue,
			propsData: {
				label: 'Test label',
			},
		});

		await flushPromises();

		expect(wrapper).toMatchSnapshot();
	});

	test('if "value" prop is validated correctly', async () => {
		expect.assertions(2);

		const valueValidator = TimeInput.props.value.validator;

		expect(valueValidator('15:15')).toBeTruthy();
		expect(valueValidator('wrong')).toBeFalsy();
	});

	test('if input event is emitted correctly for single mode', async () => {
		const wrapper = shallowMount(TimeInput, {
			localVue,
			propsData: {
				label: 'Test label',
			},
		});

		await flushPromises();

		const inputArray = wrapper.findAll('input').wrappers;

		await inputArray[0].setValue(15);

		expect(wrapper.emitted().input).toBeFalsy();

		await inputArray[1].setValue(35);

		expect(wrapper.emitted().input[0]).toContain('15:35');
	});

	test('if input event is emitted correctly for range mode', async () => {
		const wrapper = shallowMount(TimeInput, {
			localVue,
			propsData: {
				label: 'Test label',
				mode: 'range',
			},
		});

		await flushPromises();

		const inputArray = wrapper.findAll('input').wrappers;

		await inputArray[0].setValue(15);

		expect(wrapper.emitted().input).toBeFalsy();

		await inputArray[1].setValue(35);

		expect(wrapper.emitted().input).toBeFalsy();

		await inputArray[2].setValue(16);

		expect(wrapper.emitted().input).toBeFalsy();

		await inputArray[3].setValue(35);

		expect(wrapper.emitted().input[0]).toContainEqual(['15:35', '16:35']);
	});

	test('if wrong input value is converted to correct time range on event emission', async () => {
		const wrapper = shallowMount(TimeInput, {
			localVue,
			propsData: {
				label: 'Test label',
			},
		});

		await flushPromises();

		const inputArray = wrapper.findAll('input').wrappers;

		await inputArray[0].setValue(25.3);

		expect(wrapper.emitted().input).toBeFalsy();

		await inputArray[1].setValue(-12);

		expect(wrapper.emitted().input[0]).toContain('23:00');
	});
});
