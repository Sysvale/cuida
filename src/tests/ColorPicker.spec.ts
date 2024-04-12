// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import ColorPicker from '../components/ColorPicker.vue';
import { mount } from '@vue/test-utils';

describe('ColorPicker', () => {
	test('renders correctly', async () => {
		const wrapper = mount(ColorPicker, {
			props: {
				modelValue: '#000000',
				inline: true,
				swatch: ['#000000', '#000000'],
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
