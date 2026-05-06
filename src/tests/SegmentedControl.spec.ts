import { describe, test, expect } from 'vitest';
import SegmentedControl from '../components/SegmentedControl.vue';
import { mount } from '@vue/test-utils';

describe('SegmentedControl', () => {
	test('renders correctly', async () => {
		const wrapper = mount(SegmentedControl, {
			props: {
				segments: ['Segment 1', 'Segment 2'],
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('should have type="button" in all segment buttons to prevent form submission', () => {
		const wrapper = mount(SegmentedControl, {
			props: {
				segments: ['Segment 1', 'Segment 2'],
			},
		});

		const buttons = wrapper.findAll('button');
		buttons.forEach((button) => {
			expect(button.attributes('type')).toBe('button');
		});
	});

	test('should NOT trigger form submit when a segment is clicked', async () => {
		const TestComponent = {
			components: { SegmentedControl },
			template: `
				<form @submit.prevent="handleSubmit">
					<SegmentedControl :segments="['S1', 'S2']" />
				</form>
			`,
			data() {
				return { submitted: false };
			},
			methods: {
				handleSubmit() {
					this.submitted = true;
				},
			},
		};

		const wrapper = mount(TestComponent);
		const button = wrapper.find('button');

		await button.trigger('click');

		expect(wrapper.vm.submitted).toBe(false);
	});
});
