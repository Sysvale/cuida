import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import flushPromises from 'flush-promises';
import Checkbox from '../../src/components/Checkbox.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Checkbox tests', () => {
	test('if component mounts correctly', async () => {
		const wrapper = mount(Checkbox, {
			localVue,
			propsData: {
				value: false,
				label: 'checkbox test',
			},
		});

		await flushPromises();

		expect(wrapper).toMatchSnapshot();
	});

	test('if slot content is show correctly', async () => {
		const wrapper = mount(Checkbox, {
			localVue,
			propsData: {
				value: false,
				label: 'checkbox test',
			},
			slots: {
				default: '<div> checkbox slot </div>',
			},
		});

		await flushPromises();

		expect(wrapper.text()).toContain('checkbox slot');
	});

	test('if event is emitted correctly on click', async () => {
		expect.assertions(2);

		const wrapper = mount(Checkbox, {
			localVue,
			propsData: {
				value: false,
				label: 'checkbox test',
			},
		});

		await flushPromises();

		const checkbox = wrapper.find('input[type="checkbox"]');
		checkbox.trigger('click');
		await flushPromises();

		expect(wrapper.emitted().input[0][0]).toBeTruthy();
		checkbox.trigger('click');
		await flushPromises();

		expect(wrapper.emitted().input[0][1]).toBeFalsy();
	});
});
