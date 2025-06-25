import { describe, test, expect } from 'vitest';
import Chip from '../components/Chip.vue';
import { flushPromises, mount } from '@vue/test-utils';

describe('Chip', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Chip, {
			props: {
				modelValue: false,
				variant: 'gray',
			},
			slots: {
				default: 'Chip'
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('emits update modelValue event based on click correctly', async () => {
		expect.assertions(2);

		const wrapper = mount(Chip, {
			props: {
				modelValue: false,
				variant: 'gray',
			},
			slots: {
				default: 'Chip'
			}
		});

		const container = wrapper.find('[data-testid="chip-container"]');

		container.trigger('click');

		await flushPromises();

		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true]);

		container.trigger('click');

		await flushPromises();

		expect(wrapper.emitted()['update:modelValue'][1]).toEqual([false]);
	});
});
