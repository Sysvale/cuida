// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import Card from '../components/Card.vue';
import { mount } from '@vue/test-utils';

describe('Card snapshot test', () => {
	test('renders correctly', () => {
		const wrapper = mount(Card, {
			props: {
				title: 'Card Title',
				content: "Some quick example text to build on the card title and make up the bulk of the card's content.",
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
