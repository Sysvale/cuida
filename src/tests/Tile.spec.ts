// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import Tile from '../components/Tile.vue';
import Icon from '../components/Icon.vue';
import Image from '../components/Image.vue';
import Skeleton from '../components/Skeleton.vue';
import { mount, flushPromises } from '@vue/test-utils';

describe('Tile', () => {
	test('renders correctly', async () =>{
		const wrapper = mount(Tile, {
			props: {
				title: 'Tile content',
				icon: 'trash-outline',
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
		expect(wrapper.findComponent(Icon).exists()).toBeTruthy();
		expect(wrapper.findComponent(Image).exists()).toBeFalsy();

		wrapper.setProps({
			icon: 'https://via.placeholder.com/150',
		});

		await flushPromises();

		expect(wrapper.findComponent(Icon).exists()).toBeFalsy();
		expect(wrapper.findComponent(Image).exists()).toBeTruthy();
	});

	test('skeleton loads correctly', async () => {
		const wrapper = mount(Tile, {
			props: {
				loading: true,
			}
		});

		expect(wrapper.findComponent(Skeleton).exists()).toBeTruthy();

		wrapper.setProps({
			title: 'Tile content',
			icon: 'trash-outline',
			loading: false,
		});

		await flushPromises();

		expect(wrapper.findComponent(Skeleton).exists()).toBeFalsy();
	});
});
