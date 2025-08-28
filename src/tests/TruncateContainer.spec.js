import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import TruncateContainer from '../components/TruncateContainer.vue';
import CdsFlatButton from '../components/FlatButton.vue';

describe('TruncateContainer.vue', () => {
	test('renders correctly', () => {
		const wrapper = mount(TruncateContainer, {
			slots: {
				default: '<p>Some content inside the container</p>'
			}
		});
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('displays "Mostrar mais" button by default', () => {
		const wrapper = mount(TruncateContainer, {
			slots: {
				default: '<p>Content</p>'
			}
		});
		const button = wrapper.findComponent(CdsFlatButton);
		expect(button.exists()).toBe(true);
		expect(button.props('text')).toBe('Mostrar mais');
	});

	test('emits "button-click" and toggles expanded state when button is clicked', async () => {
		const wrapper = mount(TruncateContainer, {
			slots: {
				default: '<p>Content</p>'
			}
		});
		const button = wrapper.findComponent(CdsFlatButton);
		await button.trigger('click');

		expect(wrapper.emitted()).toHaveProperty('button-click');
		expect(wrapper.vm.expanded).toBe(true);

		await button.trigger('click');
		expect(wrapper.vm.expanded).toBe(false);
	});

	test('emits "expand" and "collapse" when expanded changes', async () => {
		const wrapper = mount(TruncateContainer, {
			slots: {
				default: '<p>Content</p>'
			}
		});

		wrapper.vm.expanded = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted()).toHaveProperty('expand');

		wrapper.vm.expanded = false;
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted()).toHaveProperty('collapse');
	});

	test('computes textAlign correctly', () => {
		const wrapper = mount(TruncateContainer, {
			props: { textAlign: 'right' },
			slots: {
				default: '<p>Content</p>'
			}
		});
		expect(wrapper.vm.computedTextAlign).toBe('right');
	});
});
