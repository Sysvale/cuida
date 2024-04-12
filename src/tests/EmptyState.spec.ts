import { describe, test, expect } from 'vitest';
import EmptyState from '../components/EmptyState.vue';
import { mount } from '@vue/test-utils';

describe('EmptyState', () => {
	test('renders correctly', async () => {
		const wrapper = mount(EmptyState, {
			props: {
				title: 'EmptyState title',
				text: 'EmptyState text',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
