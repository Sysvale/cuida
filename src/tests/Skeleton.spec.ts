import { describe, test, expect } from 'vitest';
import Skeleton from '../components/Skeleton.vue';
import { mount } from '@vue/test-utils';

describe('Skeleton', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Skeleton, {
			props: {
				width: '300',
				shape: 'circle'
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
