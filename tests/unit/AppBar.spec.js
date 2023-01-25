import { mount, createLocalVue } from '@vue/test-utils';
import AppBar from '../../src/components/AppBar.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(AppBar, {
		localVue,
	});
	expect(wrapper).toMatchSnapshot();
});
