import { mount, createLocalVue } from '@vue/test-utils';
import Radio from '../../src/components/Radio.vue';
import flushPromises from 'flush-promises';

import BootstrapVue from 'bootstrap-vue';
const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	const wrapper = mount(Radio, {
		localVue,
		propsData: {
			modelValue: null,
			value: 'option-1',
			label: 'Opção 1',
		},
	});

	expect(wrapper).toMatchSnapshot();
});

test('if updates v-model with value of radio on click', async () => {
	let modelValue = null;
	const wrapper = mount(Radio, {
		localVue,
		propsData: {
			modelValue,
			value: 'option-1',
			label: 'Opção 1',
			disabled: false,
			invalid: false,
		},
	});

	wrapper.find('.cds-radio__content').trigger('click');

	await flushPromises();

	expect(wrapper.emitted().change).toBeTruthy();
});
