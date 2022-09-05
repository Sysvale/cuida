import CalloutCard from '../../src/components/CalloutCard.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Button from '../../src/components/Button.vue';

const localVue = createLocalVue();

localVue.component('cds-button', Button);

describe('Callout Card', () => {
	test('if component renders correctly', async () => {
		const wrapper = shallowMount(CalloutCard, {
			localVue,
			propsData: {
				title: 'Test',
				text: 'A text test',
				image: 'http://localhost:6006/static/media/src/assets/images/CuidaTempLogo.png',
			},
		});

		await flushPromises();

		expect(wrapper).toMatchSnapshot();
	});

	test('if class are resolved correctly', async () => {
		const wrapper = shallowMount(CalloutCard, {
			localVue,
			propsData: {
				title: 'Test',
				text: 'A text test',
				image: 'http://localhost:6006/static/media/src/assets/images/CuidaTempLogo.png',
			},
		});

		await flushPromises();

		expect(wrapper.vm.resolveClass('test-class')).toBe('test-class');

		wrapper.setProps({
			compact: true,
		});

		await flushPromises();

		expect(wrapper.vm.resolveClass('test-class')).toBe('test-class--compact');
	});

	test('if actionButton click event is emitted correctly', async () => {
		const wrapper = shallowMount(CalloutCard, {
			localVue,
			propsData: {
				title: 'Test',
				text: 'A text test',
				image: 'http://localhost:6006/static/media/src/assets/images/CuidaTempLogo.png',
			},
		});

		await flushPromises();

		wrapper.findComponent(Button).vm.$emit('click');

		await flushPromises();

		expect(wrapper.emitted()).toHaveProperty('action-button-click');
	});
});
