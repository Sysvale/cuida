import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import ClusteredMultiselect from '../../src/components/ClusteredMultiselect.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const options = [
	{ text: 'Item 1' },
	{ text: 'Item 2' },
	{ text: 'Item 3' },
];

test('Component is mounted properly', async () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [options[0]],
		},
		attachTo: document.body,
	});

	wrapper.setData({ uniqueKey: 'mockKey' });

	await flushPromises();

	expect(wrapper).toMatchSnapshot();
});

test('If the group labels are not shown when theres no selected items', async () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [],
		},
		attachTo: document.body,
	});

	wrapper.trigger('click');
	await flushPromises();

	expect(wrapper.findAll('.cds-multiselect__group-label').length).toBe(0);
});

test('If the group labels are shown when theres selected items', async () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [
				{ text: 'Item 1' },
			],
		},
		attachTo: document.body,
	});

	// Do Your Magic
	wrapper.trigger('click');
	await flushPromises();

	expect(wrapper.findAll('.cds-multiselect__group-label').length > 0).toBe(true);
});

test('If "select all" option are shown when theres no selected items', () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [],
		},
		attachTo: document.body,
	});

	const prependOptionText = wrapper.findAll('.cds-multiselect__option').at(0).text();

	expect(prependOptionText).toBe('Selecionar todos');
});

test('If "select all" option works as expected', async () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [],
		},
		attachTo: document.body,
	});

	const prependOption = wrapper.findAll('.cds-multiselect__option').at(0);

	prependOption.trigger('click');
	await flushPromises();

	expect(prependOption.text()).toBe('Desfazer seleção');
});

test('If "unselect all" option are shown when theres selected items', () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [
				{ text: 'Item 1' },
			],
		},
		attachTo: document.body,
	});

	const prependOptionText = wrapper.findAll('.cds-multiselect__option').at(0).text();

	expect(prependOptionText).toBe('Desfazer seleção');
});

test('If "unselect all" option works as expected', async () => {
	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value: [
				{ text: 'Item 1' },
			],
		},
		attachTo: document.body,
	});

	const prependOption = wrapper.findAll('.cds-multiselect__option').at(0);

	prependOption.trigger('click');
	await flushPromises();

	expect(prependOption.text()).toBe('Selecionar todos');
});

test('If label is shown when only one option is selected', async () => {
	const value = [
		{ text: 'Item 1' },
	];

	const wrapper = mount(ClusteredMultiselect, {
		localVue,
		attrs: {
			options,
			value,
		},
		attachTo: document.body,
	});

	const selectedFancyMessage = wrapper.findAll('.multiselect__single').at(0);

	expect(selectedFancyMessage.text()).toBe(value[0].text);
});
