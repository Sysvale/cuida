// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import ActionsList from '../components/ActionsList.vue';
import { mount } from '@vue/test-utils';

const actions = [
	{
		'title': 'Icon1',
	},
	{
		'title': 'Icon2',
	},
	{
		'title': 'Icon3',
	},
	{
		'title': 'Icon4',
	}
];

describe('ActionsList snapshot test', () => {
	test('renders correctly', () => {
		const wrapper = mount(ActionsList, {
			props: {
				actions,
				numberOfExpandedActions: 2,
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
