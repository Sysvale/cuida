import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import Button from '../../src/components/Button.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
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

describe('Prop variant tests', () => {
	test('The color variants are properly set', () => {
		const wrapper = mount(Button, {
			localVue,
		});

		wrapper.vm.predefinedColors.forEach((color) => {
			test(`if the computed property changes when the prop variant is set to '${color}'`, async () => {
				await wrapper.setProps({ variant: color });
				expect(wrapper.vm.predefinedStyle).toBe(`badge--${color}`);
			});
		});
	});

	test('The size variants are properly set', () => {
		const wrapper = mount(Button, {
			localVue,
		});

		wrapper.vm.predefinedSizes.forEach((size) => {
			test(`if the computed property changes when the prop size is set to '${size}'`, async () => {
				await wrapper.setProps({ size });
				expect(wrapper.vm.predefinedStyle).toBe(`badge--${size}`);
			});
		});
	});
});

test('Button emits an event when clicked', () => {
	const wrapper = shallowMount(Button, {
		localVue,
	});

	expect(wrapper.find('#cds-button').exists()).toBe(true);
	wrapper.find('#cds-button').trigger('click');

	expect(wrapper.emitted().input).toBeTruthy();
	expect(wrapper.emitted().input).toEqual([[true]]);
})
