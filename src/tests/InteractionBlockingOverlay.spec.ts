import { describe, test, expect } from 'vitest';
import InteractionBlockingOverlay from '../components/InteractionBlockingOverlay.vue';
import { mount } from '@vue/test-utils';

describe('InteractionBlockingOverlay', () => {
	test('renders correctly', async () => {
		const wrapper = mount(InteractionBlockingOverlay, {
			props: {
				block: 'mobile',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
