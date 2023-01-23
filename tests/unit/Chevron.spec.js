import { mount, createLocalVue } from '@vue/test-utils';
import Chevron from '../../src/components/Chevron.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(Chevron, {
		localVue,
	});
	expect(wrapper).toMatchSnapshot();
});