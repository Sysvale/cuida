import { describe, test, expect } from 'vitest';
import SideBar from '../components/SideBar.vue';
import { mount } from '@vue/test-utils';

const mockedData = [
	{
		label: 'Dashboard',
		icon: 'dashboard-outline',
		route: {
			path: '/dashboard',
			name: 'dashboard'
		},
	},
	{
		label: 'Links',
		icon: 'link-outline',
		items: [
			{
				label: 'Painel (Tv)',
				path: '/tv-link',
				name: 'painel-tv'
			},
			{
				label: 'Totem',
				path: '/totem-link',
				name: 'totem'
			},
		]
	},
	{
		label: 'Relatórios',
		icon: 'printer-outline',
		route: {
			path: '/reports',
			name: 'pagina2'
		},
	},
];

describe('SideBar', () => {
	test('renders correctly', async () => {
		const wrapper = mount(SideBar, {
			global: {
				stubs: {
					'cds-icon': true,
				},
			},
			props: {
				items: mockedData,
				activeItem: mockedData[4],
				userName: 'Joana Mendes',
				userRole: 'Administradora',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
