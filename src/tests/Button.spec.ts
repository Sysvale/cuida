import { describe, test, expect } from 'vitest';
import Button from '../components/Button.vue';
import { mount } from '@vue/test-utils';

describe('Button', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Button, {
			props: {
				variant: 'green',
				size: 'md',
				text: 'Button',
			},
			slots: {
				default: 'Botão'
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
