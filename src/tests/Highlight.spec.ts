import { describe, test, expect } from 'vitest';
import Highlight from '../components/Highlight.vue';
import { mount } from '@vue/test-utils';

describe('Highlight', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Highlight, {
			props: {
				variant: 'success',
			},
			slots: {
				default: 'Texto',
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
