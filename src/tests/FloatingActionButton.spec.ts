import { describe, test, expect } from 'vitest';
import FloatingActionButton from '../components/FloatingActionButton.vue';
import { mount } from '@vue/test-utils';

const subItems = [
	{
		icon: 'document-outline',
		label: 'Documentos',
	},
	{
		icon: 'home-outline',
		label: 'Início',
	},
	{
		icon: 'edit-outline',
		label: 'Editar',
	}
];

describe('FloatingActionButton', () => {
	test('renders correctly', async () => {
		const wrapper = mount(FloatingActionButton, {
			props: {
				icon: 'plus-outline',
				size: 'md',
				variant: 'green',
				subItems,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
