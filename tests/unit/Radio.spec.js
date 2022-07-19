import { mount, createLocalVue } from '@vue/test-utils';
import Radio from '../../src/components/Radio.vue';

import BootstrapVue from 'bootstrap-vue';
const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	const wrapper = mount(Radio, {
		localVue,
		propsData: {
			value: '',
			label: 'Option 1',
			disabled: false,
			invalid: false,
		},
	});

	expect(wrapper).toMatchSnapshot();
});
