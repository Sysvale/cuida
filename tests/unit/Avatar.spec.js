import { mount, createLocalVue } from '@vue/test-utils';
import Avatar from '../../src/components/Avatar.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(Avatar, {
		localVue,
	});
	expect(wrapper).toMatchSnapshot();
});