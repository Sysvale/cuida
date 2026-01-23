import { describe, test, expect } from 'vitest';
import Clickable from '../components/Clickable.vue';
import { mount } from '@vue/test-utils';

describe('Clickable', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Clickable, {
			props: {
				clickable: true,
			},
			slots: {
				default: 'Content'
			}
		});

		const div = wrapper.find('div');
		expect(div.attributes('role')).toBe('button');
		expect(div.attributes('tabindex')).toBe('0');
	});

	test('emits cds-click on click', async () => {
		const wrapper = mount(Clickable, {
			props: {
				clickable: true,
			},
		});

		await wrapper.find('div').trigger('click');
		expect(wrapper.emitted('cds-click')).toBeTruthy();
	});

	test('emits cds-click on Enter key', async () => {
		const wrapper = mount(Clickable, {
			props: {
				clickable: true,
			},
		});

		await wrapper.find('div').trigger('keydown.enter');
		expect(wrapper.emitted('cds-click')).toBeTruthy();
	});

	test('emits cds-click on Space key', async () => {
		const wrapper = mount(Clickable, {
			props: {
				clickable: true,
			},
		});

		await wrapper.find('div').trigger('keydown.space');
		expect(wrapper.emitted('cds-click')).toBeTruthy();
	});

	test('does not emit cds-click when not clickable', async () => {
		const wrapper = mount(Clickable, {
			props: {
				clickable: false,
			},
		});

		await wrapper.trigger('click');
		expect(wrapper.emitted('cds-click')).toBeFalsy();
		expect(wrapper.attributes('role')).toBeUndefined();
		expect(wrapper.attributes('tabindex')).toBeUndefined();
	});
});
