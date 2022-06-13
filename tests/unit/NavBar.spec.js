import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import lodash from 'lodash';
import NavBar from '../../src/components/NavBar.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const mockedData = [
	{ label: 'Dummy label 1', path: 'dummy/path/1' },
	{ label: 'Dummy label 2', path: 'dummy/path/2' },
	{ label: 'Dummy label 3', path: 'dummy/path/3' },
	{
		label: 'Dummy option with subitems 1',
		items: [
			{
				label: 'Dummy item 1',
				path: '/dummy/sub/item/1',
			},
			{
				label: 'Dummy item 2',
				path: '/dummy/sub/item/2',
			},
			{
				label: 'Dummy item 3',
				path: '/dummy/sub/item/3',
			},
		],
	},
	{
		label: 'Dummy option with subitems 2',
		items: [
			{
				label: 'Dummy item 4',
				route: {
					path: '/dummy/sub/item/4',
					name: 'dummy-item-4',
				}
			},
			{
				label: 'Dummy item 5',
				route: {
					path: '/dummy/sub/item/5',
					name: 'dummy-item-5',
				}
			},
			{
				label: 'Dummy item 6',
				route: {
					path: '/dummy/sub/item/5',
					name: 'dummy-item-5',
				}
			},
		],
	},
];

test('Component is mounted properly', () => {
	window._ = lodash;
	const wrapper = mount(NavBar, {
		localVue,
		propsData: {
			items: mockedData,
			activeItem: mockedData[0],
		},
	});
	expect(wrapper).toMatchSnapshot();
});

describe('Items prop is properly set', () => {
	const consoleError = '[Vue warn]: Invalid prop: custom validator check failed for prop "items".';
	test('if does not throw console error when items has route', () => {
		const spy = jest.spyOn(console, 'error')

		mount(NavBar, {
			localVue,
			propsData: {
				items: mockedData[4].items,
				activeItem: mockedData[4].items[0],
			},
		});

		expect(spy).not.toHaveBeenCalledWith(expect.stringContaining(consoleError));
	});

	test('if does not throw console error when items has path', () => {
		const spy = jest.spyOn(console, 'error')

		mount(NavBar, {
			localVue,
			propsData: {
				items: mockedData[3].items,
				activeItem: mockedData[3].items[0],
			},
		});

		expect(spy).not.toHaveBeenCalledWith(expect.stringContaining(consoleError));
	});

	test('if throws console error when some element of "items" has not label', () => {
		const spy = jest.spyOn(console, 'error')

		mount(NavBar, {
			localVue,
			propsData: {
				items: [
					{ path: 'dummy/path/0' },
					...mockedData,
				],
				activeItem: mockedData[0],
			},
		});

		expect(spy).toHaveBeenCalledWith(expect.stringContaining(consoleError));
	});

	test('if throws console error when some element of "items" has not path, route or items', () => {
		const spy = jest.spyOn(console, 'error')

		mount(NavBar, {
			localVue,
			propsData: {
				items: [
					{ label: 'Dummy label 0' },
					...mockedData,
				],
				activeItem: mockedData[0],
			},
		});

		expect(spy).toHaveBeenCalledWith(expect.stringContaining(consoleError));
	});
});

describe('Items styles test', () => {
	test('if has one item set as active', () => {
		window._ = lodash;
		const wrapper = mount(NavBar, {
			localVue,
			propsData: {
				items: mockedData,
				activeItem: mockedData[0],
			},
		});
		expect(wrapper.findAll('.active').length).toBe(1);
	});

	test('if has one subitem set as active', () => {
		window._ = lodash;
		const wrapper = mount(NavBar, {
			localVue,
			propsData: {
				items: mockedData,
				activeItem: mockedData[3].items[0],
			},
		});
		expect(wrapper.findAll('.active').length).toBe(1);
	});

	test('if the dropdown parent is set as active', () => {
		window._ = lodash;
		const wrapper = mount(NavBar, {
			localVue,
			propsData: {
				items: mockedData,
				activeItem: mockedData[3].items[0],
			},
		});
		expect(wrapper.findAll('.active-parent').length).toBe(1);
	});

	test('if light mode is set properly', () => {
		window._ = lodash;
		const wrapper = mount(NavBar, {
			localVue,
			propsData: {
				items: mockedData,
				isLightThemed: true,
				activeItem: mockedData[0],
			},
		});

		expect(wrapper.findAll('.cds-nav-bar--light').length).toBe(1);
		expect(wrapper.findAll('.cds-nav-bar__item--light').length).toBe(mockedData.length);
	});
});

describe('Change active item event tests', () => {
	test('if a event is emitted when the item is clicked', () => {
		window._ = lodash;
		const wrapper = mount(NavBar, {
			localVue,
			propsData: {
				items: mockedData,
				activeItem: mockedData[0],
			},
		});

		const elementIndex = 1;

		wrapper
			.find(`#${wrapper.vm.getElementKey(mockedData[elementIndex], elementIndex)} a`)
			.trigger('click');

		expect(wrapper.emitted().click).toBeTruthy();
		expect(wrapper.emitted().click).toEqual([
			[
				mockedData[elementIndex],
			],
		]);
	});

	test('if a event is emitted when the subitem is clicked', () => {
		window._ = lodash;
		const wrapper = mount(NavBar, {
			localVue,
			propsData: {
				items: mockedData,
				activeItem: mockedData[0],
			},
		});

		wrapper
			.find(`#${wrapper.vm.getElementKey(mockedData[3].items[0], 0, true)}`)
			.trigger('click');

		expect(wrapper.emitted().click).toBeTruthy();
		expect(wrapper.emitted().click).toEqual([
			[
				mockedData[3].items[0],
			],
		]);
	});
});
