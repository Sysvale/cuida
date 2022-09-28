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
		expect.assertions(4);

		const valueValidator = TimeInput.props.value.validator;

		expect(valueValidator('15:15')).toBeTruthy();
		expect(valueValidator(['13:15', '14:20'])).toBeTruthy();
		expect(valueValidator('wrong')).toBeFalsy();
		expect(valueValidator(['15:20', '11:10'])).toBeFalsy();
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

		expect(wrapper.emitted().input[0]).toContain(null);

		await inputArray[1].setValue(35);

		expect(wrapper.emitted().input[1]).toContain('15:35');
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

		expect(wrapper.emitted().input[0]).toContain(null);

		await inputArray[1].setValue(35);

		expect(wrapper.emitted().input[1]).toContain(null);

		await inputArray[2].setValue(16);

		expect(wrapper.emitted().input[2]).toContain(null);

		await inputArray[3].setValue(35);

		expect(wrapper.emitted().input[3]).toContainEqual(['15:35', '16:35']);
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

		expect(wrapper.emitted().input[0]).toContain(null);

		await inputArray[1].setValue(-12);

		expect(wrapper.emitted().input[1]).toContain('23:00');
	});
});
