import { mount, createLocalVue } from '@vue/test-utils';
import Divider from '../../src/components/Divider.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(Divider, {
		localVue,
	});
	expect(wrapper).toMatchSnapshot();
});