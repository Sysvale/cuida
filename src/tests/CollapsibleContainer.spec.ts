import { describe, test, expect } from 'vitest';
import CollapsibleContainer from '../components/CollapsibleContainer.vue';
import { flushPromises, mount } from '@vue/test-utils';
  
describe('CollapsibleContainer', () => {
	test('renders correctly', async () => {
		const wrapper = mount(CollapsibleContainer, {
			props: {
				modelValue: true,
				title: 'Seu universo expandido',
			},
		});
  
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('content is rendered correctly on modelValue change', async () => {
		expect.assertions(2);

		const wrapper = mount(CollapsibleContainer, {
			props: {
				modelValue: false,
				title: 'Seu universo expandido',
			},
		});
  
		expect(wrapper.findAll('[data-testid="collapsible-content"]').length).toBe(0);

		wrapper.setProps({
			modelValue: true,
		});

		await flushPromises();

		expect(wrapper.findAll('[data-testid="collapsible-content"]').length).toBe(1);
	})
});
