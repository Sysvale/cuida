import { mount, createLocalVue } from '@vue/test-utils';
import RadioButtonGroup from '../../src/components/RadioButtonGroup.vue';

import BootstrapVue from 'bootstrap-vue';
const localVue = createLocalVue();
localVue.use(BootstrapVue);

const options = [
	{
		text: 'Component1',
		value: 'value1',
		disabled: true,
	},
	{
		text: 'Component2',
		value: 'value2',
	},
	{
		text: 'Component3',
		value: 'value3',
	},
];

test('Component is mounted properly', () => {
	const wrapper = mount(RadioButtonGroup, {
		localVue,
		propsData: {
			value: '',
			options: options,
		},
	});

	expect(wrapper).toMatchSnapshot();
});
