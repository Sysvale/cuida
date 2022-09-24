import { mount, createLocalVue } from '@vue/test-utils';
import Select from '../../src/components/Select.vue';

const localVue = createLocalVue();

const options = [
	{
		value: 'foo',
		id: 1,
		text: 'fancy foo text',
	},
	{
		value: 'bar',
		id: 2,
		text: 'fancy bar text',
	},
];

const value = {};

test('Component is mounted properly', () => {
	const wrapper = mount(Select, {
		localVue,
		propsData: {
			label: 'Label',
			options,
			value,
		},
	});
	expect(wrapper).toMatchSnapshot();
});

const wrapper = mount(Select, {
	localVue,
	propsData: {
		label: 'Label',
		width: 'thin',
		options,
		value,
	},
});

const input = wrapper.find('.select__input--thin');

test('Dropdown toggles when Enter is pressed', async () => {
	expect(input.exists()).toBe(true);
	expect(input.classes()).toContain('select__input--closed');

	await input.trigger('keydown.enter');
	expect(input.classes()).toContain('select__input--opened');

	await input.trigger('keydown.enter');
	expect(input.classes()).toContain('select__input--closed');
});

test('Options are being rendered', () => {
	const wrapperOptions = wrapper.findAll('.option__text');
	expect(wrapperOptions.length).toBe(options.length);
});

test('Event is emitted correctly on click', async () => {
	await input.trigger('keydown.enter');
	await input.trigger('click');

	expect(wrapper.emitted()['input']).toBeTruthy();
	expect(wrapper.emitted()['input']).toEqual([
		[
			{
				value: 'foo',
				id: 1,
				text: 'fancy foo text',
			},
		],
	]);
});
