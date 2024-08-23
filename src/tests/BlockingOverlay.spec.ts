import { describe, test, expect } from 'vitest';
import BlockingOverlay from '../components/BlockingOverlay.vue';
import { mount } from '@vue/test-utils';

describe('BlockingOverlay', () => {
	test('renders correctly', async () => {
		const wrapper = mount(BlockingOverlay, {
			props: {
				block: 'mobile',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
