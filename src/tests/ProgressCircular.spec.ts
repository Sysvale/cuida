import { describe, test, expect } from 'vitest';
import ProgressCircular from '../components/ProgressCircular.vue';
import { mount } from '@vue/test-utils';

describe('ProgressCircular', () => {
	test('renders correctly', async () => {
		const wrapper = mount(ProgressCircular, {
			props: {
				value: 0.67,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
