import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import StepperInput from '../../src/components/StepperInput.vue';
import { longClickDirective } from 'vue-long-click'

const localVue = createLocalVue();

const longClickInstance = longClickDirective({delay: 400, interval: 50});
localVue.directive('longclick', longClickInstance);

test('Component is mounted properly', () => {
	const wrapper = mount(StepperInput, {
		localVue,
	});

	expect(wrapper).toMatchSnapshot();
});

describe("Click tests", () => {
	test("if the increment button is working properly when clicked", () => {
		const wrapper = mount(StepperInput, {
			localVue,
			propsData: {
				value: 12,
			},
		});
	
		expect(wrapper.find('.stepper-input__icon--plus').exists()).toBe(true);
		wrapper.find('.stepper-input__icon--plus').trigger('click');

		wrapper.vm.$nextTick(() => {
			expect(wrapper.emitted().input).toBeTruthy();
			expect(wrapper.emitted().input).toEqual([[13]]);
		});
	
	});

	test("if the decrement button is working properly when clicked", () => {
		const wrapper = mount(StepperInput, {
			localVue,
			propsData: {
				value: 10,
			},
		});
	
		expect(wrapper.find('.stepper-input__icon--minus').exists()).toBe(true);
		wrapper.find('.stepper-input__icon--minus').trigger('click');

		wrapper.vm.$nextTick(() => {
			expect(wrapper.emitted().input).toBeTruthy();
			expect(wrapper.emitted().input).toEqual([[9]]);
		});
	});
});

test("if the value is emited properly when the number is changed by input", () => {
	const wrapper = mount(StepperInput, {
		localVue,
		propsData: {
			value: 10,
		},
	});

	wrapper.find('#stepper-input-number').element.value = 50;
	wrapper.find('#stepper-input-number').trigger('input');

	wrapper.vm.$nextTick(() => {
		expect(wrapper.emitted().input).toBeTruthy();
		expect(wrapper.emitted().input).toEqual([["50"]]);
	});
});

describe("Styles based on the state tests", () => {
	test("if the the styles are applied properly when the state is 'valid' and the input is not focused", () => {
		const wrapper = mount(StepperInput, {
			localVue,
			propsData: {
				state: 'valid',
			},
		});

		expect(wrapper.findAll('.stepper-input--valid').length).toBe(1);
	});

	test("if the the styles are applied properly when the state is 'invalid' and the input is not focused", () => {
		const wrapper = mount(StepperInput, {
			localVue,
			propsData: {
				state: 'invalid',
			},
		});

		expect(wrapper.findAll('.stepper-input--invalid').length).toBe(1);
	});
});

test("if the input is blocked when the prop disabled is true", () => {
	const wrapper = mount(StepperInput, {
		localVue,
		propsData: {
			disabled: true,
		},
	});

	wrapper.find('#stepper-input-number').trigger('input');

	wrapper.vm.$nextTick(() => {
		expect(wrapper.emitted().input).toBeFalsy();
	});

	wrapper.find('.stepper-input__icon--plus').trigger('click');

	wrapper.vm.$nextTick(() => {
		expect(wrapper.emitted().input).toBeFalsy();
	});

	wrapper.find('.stepper-input__icon--minus').trigger('click');

	wrapper.vm.$nextTick(() => {
		expect(wrapper.emitted().input).toBeFalsy();
	});
});