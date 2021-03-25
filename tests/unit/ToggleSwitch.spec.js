import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import ToggleSwitch from '../../src/components/ToggleSwitch.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	const wrapper = mount(ToggleSwitch, {
		localVue,
		propsData: {
			value: true,
		},
	});

	expect(wrapper).toMatchSnapshot();
});

describe('Click tests', () => {
	test('if the v-model value is changed properly to true when the ToggleSwitch is clicked', () => {
		const wrapper = mount(ToggleSwitch, {
			localVue,
			propsData: {
				value: false,
			},
		});

		expect(wrapper.find('.switch input').exists()).toBe(true);
		wrapper.find('.switch input').trigger('click');

		expect(wrapper.emitted().input).toBeTruthy();
		expect(wrapper.emitted().input).toEqual([[true]]);
	});

	test('if the v-model value is changed properly to false when the ToggleSwitch is clicked', () => {
		const wrapper = mount(ToggleSwitch, {
			localVue,
			propsData: {
				value: true,
			},
		});

		expect(wrapper.find('.switch input').exists()).toBe(true);
		wrapper.find('.switch input').trigger('click');

		expect(wrapper.emitted().input).toBeTruthy();
		expect(wrapper.emitted().input).toEqual([[false]]);
	});
});
