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
		label: 'Vigilância Sanitária',
		icon: 'shield-outline',
		route: {
			path: '/visa',
			name: 'visa'
		}
	},
	{
		label: 'Central de marcação',
		icon: 'calendar-outline',
		route: {
			path: '/regulation',
			name: 'regulation'
		},
	},
];

describe('MobileNavigation', () => {
	test('renders correctly', async () => {
		const wrapper = mount(MobileNavigation, {
			global: {
				stubs: {
					'cds-icon': true,
					'cds-avatar': true,
				},
			},
			props: {
				items: mockedData,
				activeItem: mockedData[1],
				user: {
					name: 'Joana Mendes',
					role: 'Administradora',
				}
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
