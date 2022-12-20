import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import ActionBar from '../../src/components/ActionBar.vue';
import Button from '../../src/components/Button.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.component('cds-button', Button);

test('Component is mounted properly', () => {
	const wrapper = mount(ActionBar, {
		localVue,
		propsData: {
			show: true,
		},
	});
	expect(wrapper).toMatchSnapshot();
});

test('if the dismiss icon is shown when the prop dismissible is setted to true', async () => {
	const wrapper = shallowMount(ActionBar, {
		localVue,
		slots: {
			description: '<div>dummy description</div>',
		},
		propsData: {
			show: true,
			dismissible: true,
			dark: true,
			actions: ['Button1', 'Button2', 'Button3'],
		},
		stubs: {
			'cds-button': true,
		},
	});

	await flushPromises();

	expect(wrapper.findAll('.toolbar__icon--dark').length).toBe(1);
});

test("if the 'fixed' class is used when the float is setted to true", async () => {
	const wrapper = shallowMount(ActionBar, {
		localVue,
		slots: {
			description: '<div>dummy description</div>',
		},
		propsData: {
			show: true,
			dismissible: true,
			dark: true,
			float: true,
			actions: ['Button1', 'Button2', 'Button3'],
		},
		stubs: {
			'cds-button': true,
		},
	});

	await flushPromises();

	expect(wrapper.findAll('.toolbar--fixed').length).toBe(1);
});

test('if the event is emited correctly when the dismissible icon is clicked', async () => {
	const wrapper = shallowMount(ActionBar, {
		localVue,
		slots: {
			description: '<div>dummy description</div>',
		},
		propsData: {
			show: true,
			dismissible: true,
			dark: true,
			float: true,
			actions: ['Button1', 'Button2', 'Button3'],
		},
		stubs: {
			'cds-button': true,
		},
	});

	await flushPromises();

	const closeButton = wrapper.find('.toolbar__icon--dark');

	expect(closeButton.exists()).toBe(true);
	closeButton.trigger('click');

	expect(wrapper.emitted().close).toBeTruthy();
	expect(wrapper.emitted().close).toEqual([[true]]);
});
