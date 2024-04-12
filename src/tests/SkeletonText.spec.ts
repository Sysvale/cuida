import { describe, test, expect } from 'vitest';
import SkeletonText from '../components/SkeletonText.vue';
import { mount } from '@vue/test-utils';

describe('SkeletonText', () => {
	test('renders correctly', async () => {
		const wrapper = mount(SkeletonText, {
			props: {
				width: '300',
				height: '20',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
