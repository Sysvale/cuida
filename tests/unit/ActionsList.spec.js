import { mount, createLocalVue } from '@vue/test-utils';
import lodash from 'lodash';
import BootstrapVue from 'bootstrap-vue';
import ActionsList from '../../src/components/ActionsList.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const actions = [
	{ title: 'Icon1', img: 'img1' },
	{ title: 'Icon2', img: 'img2' },
	{ title: 'Icon3', img: 'img3' },
	{ title: 'Icon4', img: 'img4' },
];

test('Component is mounted properly', () => {
	window._ = lodash;
	const wrapper = mount(ActionsList, {
		localVue,
		propsData: {
			actions,
		},
	});

	expect(wrapper).toMatchSnapshot();
});

describe('Action list functioning', () => {
	test('If when the number of expanded actions to be shown is 1 and there is an array of length 4, are rendered 1 action and 1 button to show more', () => {
		window._ = lodash;
		const wrapper = mount(ActionsList, {
			localVue,
			propsData: {
				actions,
				numberOfExpandedActions: 1,
			},
		});

		expect(wrapper.findAll('.action-list__item').length).toBe(1);
		expect(wrapper.findAll('.action-list__item--left-bordered').length).toBe(1);
	});

	test('If when the number of expanded actions to be shown is 4 and there is an array of length 4, are rendered 4 actions', () => {
		window._ = lodash;
		const wrapper = mount(ActionsList, {
			localVue,
			propsData: {
				actions,
				numberOfExpandedActions: 4,
			},
		});

		expect(wrapper.findAll('.action-list__item').length).toBe(1);
		expect(wrapper.findAll('.action-list__item--left-bordered').length).toBe(3);
	});

	test('If the list is expanded when the "more actions" button is clicked', async () => {
		window._ = lodash;
		const wrapper = mount(ActionsList, {
			localVue,
			propsData: {
				actions,
				numberOfExpandedActions: 1,
			},
		});

		expect(wrapper.findAll('.action-list__item').length).toBe(1);
		expect(wrapper.findAll('.action-list__item--left-bordered').length).toBe(1);

		wrapper.find('.action-list__item--left-bordered').trigger('click');

		await flushPromises();

		expect(wrapper.findAll('.action-list__item').length).toBe(1);
		expect(wrapper.findAll('.action-list__item--left-bordered').length).toBe(4);
	});

	test('If a event is emited when the action is clicked', () => {
		window._ = lodash;
		const wrapper = mount(ActionsList, {
			localVue,
			propsData: {
				actions,
				numberOfExpandedActions: 4,
			},
		});
		wrapper.find('.action-list__item').trigger('click');

		expect(wrapper.emitted()['action-clicked']).toBeTruthy();
		expect(wrapper.emitted()['action-clicked']).toEqual([
			[
				{
					img: 'img1',
					title: 'Icon1',
				},
			],
		]);
	});
});

describe('Action list side style', () => {
	test('If the left side class are applied when left prop is true', () => {
		window._ = lodash;
		const wrapper = mount(ActionsList, {
			localVue,
			propsData: {
				actions,
				left: true,
			},
		});

		expect(wrapper.findAll('.action-list--left').length).toBe(1);
	});

	test('If the right class are applied by default', () => {
		window._ = lodash;
		const wrapper = mount(ActionsList, {
			localVue,
			propsData: {
				actions,
			},
		});

		expect(wrapper.findAll('.action-list--right').length).toBe(1);
	});
});
