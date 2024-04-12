// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import SideSheet from '../components/SideSheet.vue';
import { mount } from '@vue/test-utils';

describe('Spacer snapshot test', () => {
	test('renders correctly', () => {
		const wrapper = mount(SideSheet, {
			props: {
				title: 'Title',
				modelValue: false,
			},
			slots: {
				default:
					'Conteúdo do SideSheet',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
