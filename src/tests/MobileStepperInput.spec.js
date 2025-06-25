import { describe, test, expect, vi } from 'vitest';
import MobileStepperInput from '../components/MobileStepperInput.vue';
import { shallowMount } from '@vue/test-utils';

describe('MobileStepperInput', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(MobileStepperInput);

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('state classes are applyied correctly', async () => {
		expect.assertions(1);

		const wrapper = shallowMount(MobileStepperInput);

		expect(wrapper.vm.stepperInputStatusClasses).toBe('mobile-stepper-input');
	});
});
