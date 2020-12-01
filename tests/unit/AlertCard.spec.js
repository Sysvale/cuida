import { mount, createLocalVue } from '@vue/test-utils';
import lodash from 'lodash';
import BootstrapVue from 'bootstrap-vue';
import AlertCard from '../../src/components/AlertCard.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(AlertCard, {
		localVue,
		propsData: {
			title: '',
		},
	});

	expect(wrapper).toMatchSnapshot();
});