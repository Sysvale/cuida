import { mount, createLocalVue } from '@vue/test-utils';
import lodash from 'lodash';
import BootstrapVue from 'bootstrap-vue';
import UploadInput from '../../src/components/UploadInput.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	window._ = lodash;
	const wrapper = mount(UploadInput, {
		localVue,
		propsData: {
			value: {},
		}
	});

	expect(wrapper).toMatchSnapshot();
});
