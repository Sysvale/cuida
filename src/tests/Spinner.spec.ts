import { describe, test, expect } from 'vitest';
import Spinner from '../components/Spinner.vue';
import { mount } from '@vue/test-utils';

describe('Spinner', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Spinner, {
			props: {
				size: 'sm',
				variant: 'blue',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
