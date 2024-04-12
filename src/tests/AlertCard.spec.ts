// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import AlertCard from '../components/AlertCard.vue';
import { mount } from '@vue/test-utils';

describe('AlertCard snapshot test', () => {
	test('renders correctly', () => {
		const wrapper = mount(AlertCard, {
			props: {
				title: 'Título do AlertCard',
				subTitle: 'Subtítulo do AlertCard',
				variant: 'info',
				value: false,
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
