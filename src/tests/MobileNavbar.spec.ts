import { describe, test, expect } from 'vitest';
import MobileNavbar from '../components/MobileNavbar.vue';
import { mount } from '@vue/test-utils';

const mockedData = [
	{ icon: 'home-outline', label: 'Início', route: { name: 'Google', path: 'www.google.com' } },
	{ icon: 'search-outline', label: 'Busca', route: { name: 'Google', path: 'www.google.com' }  },
	{ icon: 'notification-bell-outline', label: 'Notificações', route: { name: 'Google', path: 'www.google.com' }  },
	{ icon: 'user-outline', label: 'Perfil', route: { name: 'Google', path: 'www.google.com' }  },
];

describe('MobileNavbar', () => {
	test('renders correctly', async () => {
		const wrapper = mount(MobileNavbar, {
			global: {
				stubs: {
					'cds-icon': true,
					'cds-avatar': true,
					'router-link': true,
				},
			},
			props: {
				items: mockedData,
				variant: 'blue',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
