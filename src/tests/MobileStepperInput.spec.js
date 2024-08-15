import { describe, test, expect } from 'vitest';
import MobileStepperInput from '../components/MobileStepperInput.vue';
import { shallowMount } from '@vue/test-utils';

describe('MobileStepperInput', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(MobileStepperInput);

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('state classes are applyied correctly', async () => {
		expect.assertions(2);

		const wrapper = shallowMount(MobileStepperInput);

		expect(wrapper.vm.computedStepperClass).toBe('mobile__stepper');

		await wrapper.setProps({
			state: 'invalid',
		});

		expect(wrapper.vm.computedStepperClass).toBe('mobile__stepper--invalid');
	});
});