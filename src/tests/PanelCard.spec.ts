import { describe, test, expect } from 'vitest';
import PanelCard from '../components/PanelCard.vue';
import { mount } from '@vue/test-utils';

describe('PanelCard', () => {
	test('renders correctly', async () => {
		const wrapper = mount(PanelCard, {
			props: {
				title: 'Redes',
				subtitle: 'Habilite as redes da regulação',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
