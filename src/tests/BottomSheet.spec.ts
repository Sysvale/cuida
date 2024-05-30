import { describe, test, expect } from 'vitest';
import BottomSheet from '../components/BottomSheet.vue';
import { mount } from '@vue/test-utils';

describe('BottomSheet', () => {
	test('renders correctly', async () => {
		const wrapper = mount(BottomSheet, {
			props: {
				modelValue: true,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
