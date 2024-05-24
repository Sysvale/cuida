import { describe, test, expect } from 'vitest';
import SecondaryNavigation from '../components/SecondaryNavigation.vue';
import { mount } from '@vue/test-utils';

describe('SecondaryNavigation', () => {
	test('renders correctly', async () => {
		const wrapper = mount(SecondaryNavigation, {
			props: {
				items: [
					{
						label: 'Item 1',
						key: 'item-1',
					}
				],
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
