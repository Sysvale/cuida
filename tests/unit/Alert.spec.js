import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Alert from '../../src/components/Alert.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(Alert, {
		localVue,
		propsData: {
			text: '',
		},
		stubs: {
			'ion-icon': true,
		},
	});

	expect(wrapper).toMatchSnapshot();
});

