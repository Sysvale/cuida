// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import Chip from '../components/Chip.vue';
import { mount } from '@vue/test-utils';

describe('Chip', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Chip, {
			props: {
				variant: 'gray',
			},
			slots: {
				default: 'Chip'
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
