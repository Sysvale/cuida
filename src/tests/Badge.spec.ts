// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import Badge from '../components/Badge.vue';
import { mount } from '@vue/test-utils';

describe('Badge', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Badge, {
			props: {
				variant: 'gray',
			},
			slots: {
				default: 'Badge'
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
