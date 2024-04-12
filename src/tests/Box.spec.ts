// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import Box from '../components/Box.vue';
import { mount } from '@vue/test-utils';

describe('Spacer snapshot test', () => {
	test('renders correctly', () => {
		const wrapper = mount(Box, {
			props: {
				elevated: false,
				fluid: false,
				padding: 4,
			},
			slots: {
				default:
					'<div style="width: 100px; height: 100px; background-color: #2AC092; border-radius: 20px"/>',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
