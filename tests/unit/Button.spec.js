import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import Button from '../../src/components/Button.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', async () => {
	const wrapper = mount(Button, {
		localVue,
	});

	await wrapper.setProps({
		variant: wrapper.vm.predefinedColors[0],
		size: wrapper.vm.predefinedSizes[0],
		text: 'Conteúdo',
	});

	expect(wrapper).toMatchSnapshot();
});

describe('The color variants are properly set', () => {
	const wrapper = mount(Button, {
		localVue,
	});

	wrapper.vm.predefinedColors.forEach((color) => {
		test(`if the computed property changes when the prop variant is set to '${color}'`, async () => {
			await wrapper.setProps({ variant: color });
			expect(wrapper.vm.predefinedColor).toBe(`button--${color}`);
		});
	});

	wrapper.vm.predefinedSizes.forEach((size) => {
		test(`if the computed property changes when the prop size is set to '${size}'`, async () => {
			await wrapper.setProps({ size });
			expect(wrapper.vm.predefinedSize).toBe(`button-size--${size}`);
		});
	});
});

test('Button emits an event when clicked', () => {
	const wrapper = mount(Button, {
		localVue,
	});

	expect(wrapper.find('#cds-button button').exists()).toBe(true);
	wrapper.find('#cds-button button').trigger('click');

	expect(wrapper.emitted().click).toBeTruthy();
	expect(wrapper.emitted().click).toEqual([[true]]);
});
