import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Text from '../components/Text.vue'; // Ajuste o caminho conforme necessário

describe('Text Component', () => {
	test('renders correctly', () => {
		const wrapper = mount(Text, {
			slots: {
				default: 'Texto de exemplo',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('renders a span tag by default', () => {
		const wrapper = mount(Text, {
			slots: {
				default: 'Texto de exemplo',
			},
		});

		expect(wrapper.element.tagName.toLowerCase()).toBe('span');
	});

	test('renders the correct HTML tag based on the "as" prop', () => {
		const wrapper = mount(Text, {
			props: {
				as: 'h1',
			},
			slots: {
				default: 'Título',
			},
		});
		expect(wrapper.element.tagName.toLowerCase()).toBe('h1');
	});

	test('removes margins when "noMargin" prop is true', () => {
		const wrapper = mount(Text, {
			props: {
				noMargin: true,
			},
			slots: {
				default: 'Texto sem margens',
			},
		});

		expect(wrapper.classes()).toContain('no-margin');
	});

	test('renders the default slot content', () => {
		const wrapper = mount(Text, {
			slots: {
				default: 'Conteúdo do slot',
			},
		});

		expect(wrapper.text()).toBe('Conteúdo do slot');
	});

	test('exposes the component ref', () => {
		const wrapper = mount(Text, {
			slots: {
				default: 'Texto com ref',
			},
		});

		expect(wrapper.vm.componentRef).toBeDefined();
	});
});