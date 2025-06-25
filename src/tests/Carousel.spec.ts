import { describe, test, expect } from 'vitest';
import Carousel from '../components/Carousel.vue';
import { mount } from '@vue/test-utils';

describe('Carousel', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Carousel, {
			props: {
				items: [
					'https://picsum.photos/600/800?random=1',
					'https://picsum.photos/600/800?random=2',
					'https://picsum.photos/600/800?random=3',
					'https://picsum.photos/600/800?random=4',
					'https://picsum.photos/600/800?random=5',
					'https://picsum.photos/600/800?random=6',
					'https://picsum.photos/600/800?random=7',
				],
				gap: 0,
				snapTo: 'start',
				showArrows: false,
				darkArrows: false,
			},
			slots: {
				default: 'Texto',
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});