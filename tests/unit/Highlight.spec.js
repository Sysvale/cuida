import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Highlight from '../../src/components/Highlight.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(Highlight, {
		localVue,
	});

	expect(wrapper).toMatchSnapshot();
});

