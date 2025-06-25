import { describe, test, expect } from 'vitest';
import Breadcrumb from '../components/Breadcrumb.vue';
import { shallowMount } from '@vue/test-utils';

const items = [
	{
		label: 'Relatórios',
		route: {
			path: '/reports',
			name: 'reports'
		},
	},
	{
		label: 'Relatórios individualizados',
		route: {
			path: '/individualized-reports',
			name: 'individualized'
		},
	},
	{
		label: 'Relatório de usuários',
		route: {
			path: '/users-reports',
			name: 'users'
		},
	},
];

describe('Breadcrumb snapshot test', () => {
	test('renders correctly', () => {
		const wrapper = shallowMount(Breadcrumb, {
			global: {
				stubs: {
					'router-link': true,
				},
			},
			props: {
				items: items,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
