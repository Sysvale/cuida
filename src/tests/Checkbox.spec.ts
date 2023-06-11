import { describe, test, expect } from 'vitest';
import Button from '../components/Button.vue';
import { mount } from '@vue/test-utils';
  
describe('Button', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Button, {
			global: {
				stubs: {
					'cds-button': true,
					'cds-tooltip': true,
				},
			},
			props: {
				disabled: true,
				tooltipText: 'Tooltip test'
			},
		});
  
		expect(wrapper).toMatchSnapshot();
	});
});
