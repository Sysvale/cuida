import { describe, test, expect } from 'vitest';
import ProgressBar from '../components/ProgressBar.vue';
import { mount } from '@vue/test-utils';

describe('ProgressBar', () => {
	test('renders correctly', async () => {
		const wrapper = mount(ProgressBar, {
			props: {
				percentage: 0.67,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
