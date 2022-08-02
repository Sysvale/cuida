import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import StepperInput from '../../src/components/StepperInput.vue';
import { longClickDirective } from 'vue-long-click';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();

const longClickInstance = longClickDirective({ delay: 400, interval: 50 });
localVue.directive('longclick', longClickInstance);

test('Component is mounted properly', () => {
	const wrapper = shallowMount(StepperInput, {
		localVue,
	});

	expect(wrapper).toMatchSnapshot();
});

describe('Click tests', () => {
	test('if the increment button is working properly when clicked', async () => {
		const wrapper = shallowMount(StepperInput, {
			localVue,
			propsData: {
				value: 12,
			},
		});

		await flushPromises();

		expect(wrapper.find('.stepper-input__icon--plus').exists()).toBe(true);
		wrapper.find('.stepper-input__icon--plus').trigger('click');

		await flushPromises();

		expect(wrapper.emitted().input).toBeTruthy();
		expect(wrapper.emitted().input).toEqual([[13]]);
	});

	test('if the decrement button is working properly when clicked', async () => {
		const wrapper = shallowMount(StepperInput, {
			localVue,
			propsData: {
				value: 10,
			},
		});

		await flushPromises();

		expect(wrapper.find('.stepper-input__icon--minus').exists()).toBe(true);
		wrapper.find('.stepper-input__icon--minus').trigger('click');

		await flushPromises();

		expect(wrapper.emitted().input).toBeTruthy();
		expect(wrapper.emitted().input).toEqual([[9]]);
	});
});

test('if the value is emited properly when the number is changed by input', async () => {
	const wrapper = shallowMount(StepperInput, {
		localVue,
		propsData: {
			value: 10,
		},
	});

	await flushPromises();

	wrapper.find('#stepper-input-number').element.value = 50;
	wrapper.find('#stepper-input-number').trigger('input');

	await flushPromises();

	expect(wrapper.emitted().input).toBeTruthy();
	expect(wrapper.emitted().input).toEqual([[50]]);
});

describe('Styles based on the state tests', () => {
	test("if the the styles are applied properly when the state is 'valid' and the input is not focused", async () => {
		const wrapper = shallowMount(StepperInput, {
			localVue,
			propsData: {
				state: 'valid',
			},
		});

		await flushPromises();

		expect(wrapper.findAll('.stepper-input--valid').length).toBe(1);
	});

	test("if the the styles are applied properly when the state is 'invalid' and the input is not focused", async () => {
		const wrapper = shallowMount(StepperInput, {
			localVue,
			propsData: {
				state: 'invalid',
			},
		});

		await flushPromises();

		expect(wrapper.findAll('.stepper-input--invalid').length).toBe(1);
	});
});

test('if the input is blocked when the prop disabled is true', async () => {
	const wrapper = shallowMount(StepperInput, {
		localVue,
		propsData: {
			disabled: true,
		},
	});

	await flushPromises();

	wrapper.find('#stepper-input-number').trigger('input');

	expect(wrapper.emitted().input).toBeFalsy();

	wrapper.find('.stepper-input__icon--plus').trigger('click');

	await flushPromises();

	expect(wrapper.emitted().input).toBeFalsy();

	wrapper.find('.stepper-input__icon--minus').trigger('click');

	await flushPromises();

	expect(wrapper.emitted().input).toBeFalsy();
});

describe('Value boundaries test', () => {
	test('if the error is emitted when the value is above the maximum', async () => {
		const wrapper = shallowMount(StepperInput, {
			localVue,
			propsData: {
				value: 10,
				max: 10,
			},
		});

		wrapper.find('.stepper-input__icon--plus').trigger('click');

		await flushPromises();

		expect(wrapper.emitted()['invalid-number']).toBeTruthy();
		expect(wrapper.emitted()['invalid-number']).toEqual([
			["'O campo não pode ser maior que 10.'"],
		]);
	});

	test('if the error is emitted when the value is above the maximum', async () => {
		const wrapper = shallowMount(StepperInput, {
			localVue,
			propsData: {
				value: 0,
				min: 0,
			},
		});

		wrapper.find('.stepper-input__icon--minus').trigger('click');

		await flushPromises();

		expect(wrapper.emitted()['invalid-number']).toBeTruthy();
		expect(wrapper.emitted()['invalid-number']).toEqual([
			["'O campo não pode ser menor que 0.'"],
		]);
	});
});
