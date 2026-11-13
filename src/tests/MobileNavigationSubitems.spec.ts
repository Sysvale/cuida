import { describe, test, expect } from 'vitest';
import MobileNavigation from '../components/MobileNavigation.vue';
import { mount } from '@vue/test-utils';

const mockedData = [
	{
		label: 'Início',
		icon: 'home-outline',
		route: {
			path: '/home',
			name: 'home'
		},
	},
	{
		label: 'Agendamentos',
		icon: 'calendar-outline',
		items: [
			{
				label: 'Categorias',
				route: {
					path: '/categories',
					name: 'index-categories',
				},
			},
		],
	},
];

describe('MobileNavigation subitems', () => {
	test('renders items with subitems correctly', async () => {
		const wrapper = mount(MobileNavigation, {
			global: {
				stubs: {
					'cds-icon': true,
					'cds-avatar': true,
					'router-link': { template: '<a><slot /></a>' },
				},
			},
			props: {
				items: mockedData,
				user: {
					name: 'Joana Mendes',
					role: 'Administradora',
				}
			},
		});

		// Check if the parent item is rendered
		expect(wrapper.text()).toContain('Agendamentos');

		// Check if subitems are initially not rendered
		expect(wrapper.text()).not.toContain('Categorias');

		// Find the parent item with subitems and click it to expand
		const parentItem = wrapper.findAll('.mobile-navigation__sidebar-item').filter(w => w.text().includes('Agendamentos'))[0];
		await parentItem.trigger('click');

		// Check if subitems are now rendered
		expect(wrapper.text()).toContain('Categorias');

		// Check if isActive correctly identifies active parent when subitem is active
		const subitem = wrapper.find('.mobile-navigation__sidebar-subitem');
		// We can't easily test router-link active state here without a real router,
		// but we can test the isActive logic if we mount with an activeItem that is a subitem.
	});

	test('identifies active parent when subitem is active', async () => {
		const subitem = mockedData[1].items[0];
		const wrapper = mount(MobileNavigation, {
			global: {
				stubs: {
					'cds-icon': true,
					'cds-avatar': true,
					'router-link': { template: '<a><slot /></a>' },
				},
			},
			props: {
				items: mockedData,
				activeItem: subitem,
				user: {
					name: 'Joana Mendes',
					role: 'Administradora',
				}
			},
		});

		// The parent item "Agendamentos" should have the active class
		const parentItem = wrapper.findAll('.mobile-navigation__sidebar-item').filter(w => w.text().includes('Agendamentos'))[0];
		expect(parentItem.classes()).toContain('mobile-navigation__sidebar-item--active');
	});
});
