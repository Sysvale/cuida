import { describe, test, expect } from 'vitest';
import CalloutCard from '../components/CalloutCard.vue';
import { mount } from '@vue/test-utils';

describe('CalloutCard', () => {
	test('renders correctly', async () => {
		const wrapper = mount(CalloutCard, {
			props: {
				image: 'https://cdn-icons-png.flaticon.com/512/7486/7486747.png',
				title: 'Título do CalloutCard',
			},
			slots: {
				text: 'Texto do CalloutCar',
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});