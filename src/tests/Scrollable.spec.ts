import { describe, test, expect } from 'vitest';
import Scrollable from '../components/Scrollable.vue';
import { mount } from '@vue/test-utils';

describe('Scrollable', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Scrollable, {
			props: {
				maxHeight: '200px',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
