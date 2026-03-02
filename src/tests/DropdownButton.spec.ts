import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DropdownButton from '../components/DropdownButton.vue';

describe('DropdownButton', () => {
	test('renders correctly and emits event with id when an option is clicked', async () => {
		const items = [
			{ id: 'opt-1', label: 'Option 1', icon: 'box-outline' },
			{ id: 'opt-2', label: 'Option 2', icon: 'box-outline' },
		];
		const wrapper = mount(DropdownButton, {
			props: {
				items,
				text: 'Click me',
			},
			global: {
				stubs: {
					CdsIcon: true,
					CdsChevron: true,
					CdsButton: {
						template: '<button><slot name="append"></slot><slot></slot></button>'
					}
				},
				directives: {
					cdstip: () => {}
				}
			}
		});

		// Open dropdown
		await wrapper.find('button').trigger('click');
		expect(wrapper.vm.isActive).toBe(true);

		// Find options
		const options = wrapper.findAll('.dropdown__container');
		expect(options.length).toBe(2);

		// Click first option
		await options[0].trigger('click');

		// Check event
		expect(wrapper.emitted('action-click')).toBeTruthy();
		expect(wrapper.emitted('action-click')[0]).toEqual(['opt-1']);
	});
});
