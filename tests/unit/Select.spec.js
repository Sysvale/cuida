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

describe('Events tests', () => {
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
			propsData: {
				selected: {
					'bar': 'bar-value',
				},
				options: [
					{
						'foo': 'foo-value',
					},
					{
						'bar': 'bar-value',
					},
				],
			}
		});

		const firstOption = wrapper.find('select:first-child');

		expect(firstOption.exists()).toBe(true);

		wrapper.find('select').trigger('click');
		firstOption.trigger('click');

		expect(wrapper.props.selected).toBe({
			'bar': 'bar-value',
		});
	});
});

test("if the click event is not emitted when the select is clicked and is disabled'", () => {
	const wrapper = mount(Select, {
		localVue,
		propsData: {
			selected: {
				'bar': 'bar-value',
			},
			options: [
				{
					'foo': 'foo-value',
				},
				{
					'bar': 'bar-value',
				},
			],
			disabled: true,
		}
	});

	const select = wrapper.find('#cds-select');

	expect(select.exists()).toBe(true);
	select.trigger('click');

	expect(wrapper.emitted().click).toBeFalsy();
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
