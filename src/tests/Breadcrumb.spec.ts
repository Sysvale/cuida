import { describe, test, expect } from 'vitest';
import Breadcrumb from '../components/Breadcrumb.vue';
import { mount, shallowMount } from '@vue/test-utils';

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

describe('Breadcrumb variant', () => {
	function mountBreadcrumb(props = {}) {
		return mount(Breadcrumb, {
			global: {
				stubs: {
					'router-link': { template: '<a><slot /></a>' },
				},
			},
			props: {
				items,
				...props,
			},
		});
	}

	test('aplica a variant blue a todos os links por padrão', () => {
		const links = mountBreadcrumb().findAll('.breadcrumb__link');

		expect(links).toHaveLength(items.length);
		links.forEach((link) => expect(link.classes()).toContain('breadcrumb__link--blue'));
	});

	test('aplica a variant recebida a todos os links', () => {
		const links = mountBreadcrumb({ variant: 'red' }).findAll('.breadcrumb__link');

		expect(links).toHaveLength(items.length);
		links.forEach((link) => {
			expect(link.classes()).toContain('breadcrumb__link--red');
			expect(link.classes()).not.toContain('breadcrumb__link--blue');
		});
	});
});
