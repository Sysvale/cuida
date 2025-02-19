import { describe, test, expect } from 'vitest';
import TopAppBar from '../components/TopAppBar.vue';
import { mount } from '@vue/test-utils';

describe('TopAppBar', () => {
	test('renders correctly', async () => {
		const wrapper = mount(TopAppBar, {
			props: {
				title: 'Título massa',
				showMenuIcon: true,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
