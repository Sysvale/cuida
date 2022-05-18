import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import CollapsibleContainer from '../../src/components/CollapsibleContainer.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

test('Component is mounted properly', () => {
	const wrapper = shallowMount(CollapsibleContainer, {
		localVue,
		propsData: {
			value: true,
			title: 'Seu universo expandido',
		},
		stubs: {
			'ion-icon': true,
		},
	});

	expect(wrapper).toMatchSnapshot();
});

describe('Click tests', () => {
	test('if container is expanded and an event is emitted when the item is clicked', async () => {
		const wrapper = shallowMount(CollapsibleContainer, {
			localVue,
			propsData: {
				title: 'Expanda seu universo',
				value: false,
			},
			stubs: {
				'ion-icon': true,
			},
		});

		wrapper.find('.cds-collapsible-container__item').trigger('click');
		await flushPromises();

		expect(wrapper.find('.cds-collapsible-container__content').exists()).toBe(true);
		expect(wrapper.find('.cds-collapsible-container__icon--expanded').exists()).toBe(true);

		expect(wrapper.emitted().input).toBeTruthy();
		expect(wrapper.emitted().input).toEqual([[true]]);
	});

	test('if container is collapsed and an event is emitted when the item is clicked', async () => {
		const wrapper = shallowMount(CollapsibleContainer, {
			localVue,
			propsData: {
				title: 'Includa seu universo',
				value: true,
			},
			stubs: {
				'ion-icon': true,
			},
		});

		wrapper.find('.cds-collapsible-container__item').trigger('click');
		await flushPromises();

		expect(wrapper.find('.cds-collapsible-container__content').exists()).toBe(false);
		expect(wrapper.find('.cds-collapsible-container__icon--collapsed').exists()).toBe(true);

		expect(wrapper.emitted().input).toBeTruthy();
		expect(wrapper.emitted().input).toEqual([[false]]);
	});
});
