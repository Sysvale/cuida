import { describe, test, expect } from 'vitest';
import QuickActionBar from '../components/QuickActionBar.vue';
import { mount } from '@vue/test-utils';

describe('QuickActionBar', () => {
	test('renders correctly', async () => {
		const wrapper = mount(QuickActionBar, {
			props: {
				modelValue: true,
				loading: false,
				groups: [
					{
						category: 'Gestantes',
						results: [
							{
								title: 'Carla Santana',
								cpf: '22233344405',
								cns: '900098367891993'
							},
							{
								title: 'Carliane Ferreira',
								cpf: '22233344405',
								cns: '900098367891993'
							},
							{
								title: 'Fernanda Cardoso da Fonseca',
								cpf: '22233344405',
								cns: '900098367891993'
							},
							{
								title: 'Rafael Assunção',
								cpf: '22233344405',
								cns: '900098367891993'
							},
						]
					},
					{
						category: 'Métricas',
						results: [
							{
								title: 'Nº de pessoas',
								num: 398,
							},
							{
								title: 'Nº de crianças',
								num: 398,
							},
						]
					},
				],
				recents: [
					{
						title: 'coração',
						cpf: '22233344405',
					},
					{
						title: 'Carlota Oliveira',
					},
				],
				description: 'Esta ação afetará o sistema e os arquivos associados.',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
