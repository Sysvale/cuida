import { describe, test, expect } from 'vitest';
import HalfCircularProgress from '../components/HalfCircularProgress.vue';
import { mount } from '@vue/test-utils';

describe('HalfCircularProgress', () => {
	test('renders correctly', async () => {
		const wrapper = mount(HalfCircularProgress, {
			props: {
				variant: 'green',
				size: 300,
				value: 79.2,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
