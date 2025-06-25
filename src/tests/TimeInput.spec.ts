import { describe, test, expect } from 'vitest';
import TimeInput from '../components/TimeInput.vue';
import { mount } from '@vue/test-utils';

describe('TimeInput', () => {
	test('renders correctly', async () => {
		const wrapper = mount(TimeInput, {
			props: {
				label: 'Test label',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});

