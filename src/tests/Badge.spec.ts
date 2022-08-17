// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import Badge from '../components/Badge.vue';
import { mount } from '@vue/test-utils';

describe('Badge', () => {
	it('renders correctly', async () => {
		const wrapper = mount(Badge, {
			variant: 'gray',
		});

		await flushPromises();

		expect(wrapper).toMatchSnapshot();
	});
});
