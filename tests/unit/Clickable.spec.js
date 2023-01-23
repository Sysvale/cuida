import { mount, createLocalVue } from '@vue/test-utils';
import Clickable from '../../src/components/Clickable.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(Clickable, {
		localVue,
	});
	expect(wrapper).toMatchSnapshot();
});