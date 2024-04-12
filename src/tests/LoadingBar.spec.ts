import { describe, test, expect } from 'vitest';
import LoadingBar from '../components/LoadingBar.vue';
import { mount } from '@vue/test-utils';

describe('LoadingBar', () => {
	test('renders correctly', async () => {
		const wrapper = mount(LoadingBar, {
			props: {},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
