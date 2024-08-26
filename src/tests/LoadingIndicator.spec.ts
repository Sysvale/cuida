import { describe, test, expect } from 'vitest';
import LoadingIndicator from '../components/LoadingIndicator.vue';
import { mount } from '@vue/test-utils';

describe('LoadingIndicator', () => {
	test('renders correctly', async () => {
		const wrapper = mount(LoadingIndicator, {
			props: {
				modelValue: true,
				variant: 'green',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
