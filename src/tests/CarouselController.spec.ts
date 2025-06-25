import { describe, test, expect } from 'vitest';
import Button from '../components/Button.vue';
import { mount } from '@vue/test-utils';

describe('Button', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Button, {
			props: {
				total: 12,
				perPage: 4,
				propertyName: 'Métricas',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
