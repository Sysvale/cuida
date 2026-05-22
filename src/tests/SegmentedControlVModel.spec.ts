import { describe, test, expect } from 'vitest';
import SegmentedControl from '../components/SegmentedControl.vue';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

describe('SegmentedControl v-model', () => {
	test('should respect initial modelValue', async () => {
		const wrapper = mount(SegmentedControl, {
			props: {
				segments: ['Segment 1', 'Segment 2'],
				modelValue: 'Segment 2',
			},
		});

		const activeButtons = wrapper.findAll('.segment-control__button--active');
		expect(activeButtons.length).toBe(1);
		expect(activeButtons[0].text()).toBe('Segment 2');
	});

	test('should update modelValue when a segment is clicked', async () => {
		const wrapper = mount(SegmentedControl, {
			props: {
				segments: ['Segment 1', 'Segment 2'],
				modelValue: 'Segment 1',
				'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
			},
		});

		const buttons = wrapper.findAll('.segment-control__button');
		await buttons[1].trigger('click');

		expect(wrapper.emitted('update:modelValue')).toBeTruthy();
		expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Segment 2']);
	});

	test('should default to the first segment if no modelValue is provided', async () => {
		const wrapper = mount(SegmentedControl, {
			props: {
				segments: ['Segment 1', 'Segment 2'],
			},
		});

		await nextTick();

		const activeButtons = wrapper.findAll('.segment-control__button--active');
		expect(activeButtons.length).toBe(1);
		expect(activeButtons[0].text()).toBe('Segment 1');
	});

	test('should still emit click event when a segment is clicked', async () => {
		const wrapper = mount(SegmentedControl, {
			props: {
				segments: ['Segment 1', 'Segment 2'],
				modelValue: 'Segment 1',
			},
		});

		const buttons = wrapper.findAll('.segment-control__button');
		await buttons[1].trigger('click');

		expect(wrapper.emitted('click')).toBeTruthy();
		expect(wrapper.emitted('click')![0]).toEqual(['Segment 2', 1]);
	});
});
