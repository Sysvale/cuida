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
				},
			},
			{
				label: 'Dummy item 5',
				route: {
					path: '/dummy/sub/item/5',
					name: 'dummy-item-5',
				},
			},
			{
				label: 'Dummy item 6',
				route: {
					path: '/dummy/sub/item/5',
					name: 'dummy-item-5',
				},
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
