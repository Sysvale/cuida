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
