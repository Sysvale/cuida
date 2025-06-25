// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import List from '../components/List.vue';
import { mount } from '@vue/test-utils';

describe('List snapshot test', () => {
	test('renders correctly', () => {
		const wrapper = mount(List, {
			props: {
				items: [
					{
						title: 'List Title 1',
						content: 'Some quick example text to build on the List title and make up the bulk of the List\'s content.',
					},
					{
						title: 'List Title 2',
						content: 'Some quick example text to build on the List title and make up the bulk of the List\'s content.',
					},
				],
				variant: 'green',
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
