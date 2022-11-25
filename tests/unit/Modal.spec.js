import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Modal from '../../src/components/Modal.vue';
import { directive as onClickOutside } from 'vue-on-click-outside';
import flushPromises from 'flush-promises';

import Button from '../../src/components/Button.vue';

const localVue = createLocalVue();

localVue.directive('on-click-outside', onClickOutside);
localVue.component('cds-button', Button);

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

describe('default content, classes and attributes', () => {
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
	test('close modal options is unavailable when noCloseButton e noCancelButton is set', async () => {
		const wrapper = mount(Modal, {
			localVue,
			propsData: {
				show: true,
				noCloseButton: true,
				noCancelButton: true,
			},
			stubs: {
				'cds-button': true,
				'cds-scrollable': true,
				'ion-icon': true,
			},
		});

		await flushPromises();

		expect(wrapper.find('.cds-modal__close-icon').exists()).toBe(false);

		expect(wrapper.find('.cds-modal__footer').html().includes('Cancelar')).toBe(false);
	});

	test('hide default footer when noFooter is set', async () => {
		const wrapper = mount(Modal, {
			localVue,
			propsData: {
				show: true,
				noFooter: true,
			},
			stubs: {
				'cds-button': true,
				'cds-scrollable': true,
				'ion-icon': true,
			},
		});

		await flushPromises();

		expect(wrapper.find('.cds-modal__footer').exists()).toBe(false);
	});

	test('hide default header when noHeader is set', async () => {
		const wrapper = mount(Modal, {
			localVue,
			propsData: {
				show: true,
				noHeader: true,
			},
			stubs: {
				'cds-button': true,
				'cds-scrollable': true,
				'ion-icon': true,
			},
		});

		await flushPromises();

		expect(wrapper.find('.cds-modal__header').exists()).toBe(false);
	});

	test('applies a custom header slot as expected', async () => {
		const wrapper = mount(Modal, {
			localVue,
			slots: {
				header: '<div>dummy header</div>',
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

		expect(wrapper.find('.cds-modal__header').exists()).toBe(false);
		expect(wrapper.find('.cds-modal').html()).toContain('<div>dummy header</div>');
	});

	test('applies a custom footer slot as expected', async () => {
		const wrapper = mount(Modal, {
			localVue,
			slots: {
				footer: '<div>dummy footer</div>',
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

		expect(wrapper.find('.cds-modal__footer').text()).toBe('dummy footer');
	});
});

describe('button and event functionality', () => {
	test('header close button triggers modal close', async () => {
		const wrapper = mount(Modal, {
			localVue,
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

		wrapper.find('.cds-modal__close-icon').trigger('click');

		await flushPromises();

		expect(wrapper.emitted().close).toBeTruthy();
		expect(wrapper.emitted().close).toEqual([[true]]);
	});

	test('footer cancel button triggers modal close', async () => {
		const wrapper = mount(Modal, {
			localVue,
			propsData: {
				show: true,
			},
			stubs: {
				'cds-scrollable': true,
				'ion-icon': true,
			},
		});

		await flushPromises();

		wrapper.findComponent(Button).find('.button__container').trigger('click');

		await flushPromises();

		expect(wrapper.emitted().close).toBeTruthy();
		expect(wrapper.emitted().close).toEqual([[true]]);
	});

	test('footer ok button triggers modal ok', async () => {
		const wrapper = mount(Modal, {
			localVue,
			propsData: {
				show: true,
			},
			stubs: {
				'cds-scrollable': true,
				'ion-icon': true,
			},
		});

		await flushPromises();

		wrapper.findAllComponents(Button).at(1).find('.button__container').trigger('click');

		await flushPromises();

		expect(wrapper.emitted().ok).toBeTruthy();
		expect(wrapper.emitted().ok).toEqual([[true]]);
	});
});
