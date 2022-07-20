import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Select from '../../src/components/Select.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	const wrapper = mount(Select, {
		localVue,
		slots: {
			default: 'Conteúdo',
		},
	});
	expect(wrapper).toMatchSnapshot();
});

// evento open
// select
// disabled
// chevron

test('The component emits the open event when it is open', () => {
	const wrapper = mount(Select, {
		localVue,
	});

	expect(wrapper.find('#cds-select').exists()).toBe(true);
	const select = wrapper.find('#cds-select');

	select.trigger('click');

	expect(wrapper.emitted().open).toBeTruthy();
});

test('The component makes its value reactive', () => {
	const wrapper = mount(Select, {
		localVue,
		props: {
			value: 'bar',
			options: [
				{
					'foo': 'foo-value',
				}
			],
		}
	});

	expect(wrapper.find('select:first-child').exists()).toBe(true);
	const option = wrapper.find('select:first-child');

	option.trigger('click');

	expect(wrapper.props.value).toBe('foo');
});

// describe('Prop variant tests', () => {
// 	const wrapper = mount(Badge, {
// 		localVue,
// 		slots: {
// 			default: 'Conteúdo',
// 		},
// 	});

// 	wrapper.vm.predefinedColors.forEach((color) => {
// 		test(`if the computed property changes when the prop variant is setted to '${color}'`, async () => {
// 			await wrapper.setProps({ variant: color });
// 			expect(wrapper.vm.predefinedStyle).toBe(`badge--${color}`);
// 		});
// 	});
// });
