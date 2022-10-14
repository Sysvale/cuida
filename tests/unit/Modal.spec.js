import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Modal from '../../src/components/Modal.vue';
import { directive as onClickOutside } from 'vue-on-click-outside' 

const localVue = createLocalVue();

localVue.directive('on-click-outside', onClickOutside);

test('Component is mounted properly', () => {
	const wrapper = shallowMount(Modal, {
		localVue,
		slots: {
			default: '<div>modal content</div>',
		},
		propsData: {
			show: true,
			top: 20,
			right: 20,
			height: 293,
			width: 313,
		},
	});

	expect(wrapper).toMatchSnapshot();
});