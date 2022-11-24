import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Modal from '../../src/components/Modal.vue';
import { directive as onClickOutside } from 'vue-on-click-outside';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();

localVue.directive('on-click-outside', onClickOutside);

test('Component is mounted properly', async () => {
	const wrapper = shallowMount(Modal, {
		localVue,
		slots: {
			default: '<div>modal content</div>',
		},
		propsData: {
			show: true,
		},
		stubs: {
			'cds-button': true,
			'cds-scrollable': true,
			'ion-icon': true,
		},
	});

	await flushPromises();

	expect(wrapper).toMatchSnapshot();
});

describe('default content, classes and attributes',  () => {
	test('modal is hidden when show is false', async () => {
		const wrapper = mount(Modal, {
			localVue,
			slots: {
				default: '<div>modal content</div>',
			},
			propsData: {
				show: false,
			},
			stubs: {
				'cds-button': true,
				'cds-scrollable': true,
				'ion-icon': true,
			},
		});

		await flushPromises();

		expect(wrapper.find('.cds-modal').exists()).toBe(false);
	});

	test('structure is as expected when title, size, okButtonText e cancelButtonText is defined', async () => {
		const wrapper = mount(Modal, {
			localVue,
			slots: {
				default: '<div>modal content</div>',
			},
			propsData: {
				show: true,
				title: 'Dummy title',
				okButtonText: 'Confirmar',
				cancelButtonText: 'Cancelar',
				size: 'sm',
			},
			stubs: {
				'cds-button': true,
				'cds-scrollable': true,
				'ion-icon': true,
			},
		});

		await flushPromises();

		// applies size class
		expect(wrapper.find('.cds-modal--sm').exists()).toBe(true);

		// applies title prop
		expect(wrapper.find('.cds-modal__header').text()).toContain('Dummy title');

		// applies okButtonText prop
		expect(wrapper.find('.cds-modal__footer').html()).toContain('text="Confirmar"');

		// applies cancelButtonText prop
		expect(wrapper.find('.cds-modal__footer').html()).toContain('text="Cancelar"');
	});
});

describe('custom content, attributes and slots', () => {
	// if close modal is unavailable when noCloseOnBackdrop, noCloseButton e noCancelButton is set
	
	// if dont show default footer when noFooter is true
	// if dont show default header when noHeader is true
	
	// if applies a custom header slot as expected 
	// if applies a custom footer slot as expected 
});

describe('button and event functionality', () => {
	// if header close button triggers modal close
	// if footer cancel button triggers modal close
	// if footer ok button triggers modal ok
	// if click outside closes modal
});
