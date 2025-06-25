// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import ActionBar from '../components/ActionBar.vue';
import { mount } from '@vue/test-utils';

const actions = ['Button1', 'Button2', 'Button3'];

describe('ActionBar snapshot test', () => {
	test('renders correctly', async () => {
		const wrapper = mount(ActionBar, {
			props: {
				show: true,
				actions,
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
