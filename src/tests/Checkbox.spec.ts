import { describe, test, expect } from 'vitest';
import Button from '../components/Button.vue';
import { mount } from '@vue/test-utils';
  
describe('Button', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Button, {
			global: {
				stubs: {
					'cds-tooltip': true,
				},
			},
			props: {
				value: false,
				label: 'checkbox test'
			},
		});
  
		expect(wrapper).toMatchSnapshot();
	});
});
