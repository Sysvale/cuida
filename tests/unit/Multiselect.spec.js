import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Multiselect from '../../src/components/Multiselect.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const options = [
	{
		title: 'Item 1',
	},
	{
		title: 'Item 2',
	},
	{
		title: 'Item 3',
	},
];

test('Component is mounted properly', () => {
	const wrapper = mount(Multiselect, {
		localVue,
		attrs: {
			options,
			value: [options[0]],
		},
		attachTo: document.body,
	});

	expect(wrapper).toMatchSnapshot();
});

test('If the group labels are not shown when theres no selected items', () => {
	const wrapper = mount(Multiselect, {
		localVue,
		attrs: {
			options,
			value: [],
		},
		attachTo: document.body,
	});

	expect(wrapper.findAll('.cds-multiselect__group-label').length).toBe(0);
});
