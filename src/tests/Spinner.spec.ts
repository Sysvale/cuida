import { describe, test, expect, vi } from 'vitest';
import Spinner from '../components/Spinner.vue';
import { flushPromises, mount } from '@vue/test-utils';

describe('Spinner', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Spinner, {
			props: {
				size: 'sm',
				variant: 'blue',
			},
		});

		await flushPromises();

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('renders correctly with delay', async () => {
		vi.useFakeTimers();

		const wrapper = mount(Spinner, {
			props: {
				size: 'sm',
				variant: 'blue',
				delay: 1000,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();

		await vi.runAllTimers();

		expect(wrapper.html()).toMatchSnapshot();
	});
});
