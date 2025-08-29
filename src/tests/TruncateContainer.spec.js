import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import TruncateContainer from '../components/TruncateContainer.vue';
import CdsFlatButton from '../components/FlatButton.vue';

const MANY_PARAGRAPHS = `
	<p>Content</p>
	<p>Content</p>
	<p>Content</p>
	<p>Content</p>
	<p>Content</p>
	<p>Content</p>
	<p>Content</p>
	<p>Content</p>
	<p>Content</p>
	<p>Content</p>
`;

function mockOverflow(wrapper, { scrollHeight, clientHeight }) {
	const el = wrapper.vm.$refs.truncateContainerEl;
	Object.defineProperty(el, 'scrollHeight', { value: scrollHeight, configurable: true });
	Object.defineProperty(el, 'clientHeight', { value: clientHeight, configurable: true });

	wrapper.vm.checkOverflow();
}

describe('TruncateContainer.vue', () => {
	test('renders correctly', () => {
		const wrapper = mount(TruncateContainer, {
			slots: {
				default: '<p>Some content inside the container</p>'
			}
		});
		expect(wrapper.find('.truncate-container').html()).toMatchSnapshot();
	});

	test('shows "Mostrar mais" button when content overflows', async () => {
		const wrapper = mount(TruncateContainer, {
			props: { height: '50' },
			slots: { default: MANY_PARAGRAPHS }
		});

		mockOverflow(wrapper, { scrollHeight: 200, clientHeight: 50 });

		await wrapper.vm.$nextTick();

		const button = wrapper.findComponent(CdsFlatButton);
		expect(button.exists()).toBe(true);
		expect(button.props('text')).toBe('Mostrar mais');
	});

	test('emits "button-click" and toggles expanded state when button is clicked', async () => {
		const wrapper = mount(TruncateContainer, {
			props: { height: '50' },
			slots: { default: MANY_PARAGRAPHS }
		});

		mockOverflow(wrapper, { scrollHeight: 200, clientHeight: 50 });

		await wrapper.vm.$nextTick();

		const button = wrapper.findComponent(CdsFlatButton);
		await button.trigger('click');

		expect(wrapper.emitted()).toHaveProperty('button-click');
		expect(wrapper.vm.expanded).toBe(true);

		await button.trigger('click');
		expect(wrapper.vm.expanded).toBe(false);
	});

	test('emits "expand" and "collapse" when expanded changes via button clicks', async () => {
		const wrapper = mount(TruncateContainer, {
			props: { height: '50' },
			slots: { default: MANY_PARAGRAPHS }
		});

		mockOverflow(wrapper, { scrollHeight: 200, clientHeight: 50 });

		await wrapper.vm.$nextTick();

		const button = wrapper.findComponent(CdsFlatButton);

		await button.trigger('click');
		expect(wrapper.emitted()).toHaveProperty('expand');

		await button.trigger('click');
		expect(wrapper.emitted()).toHaveProperty('collapse');
	});

	test('computes textAlign correctly', () => {
		const wrapper = mount(TruncateContainer, {
			props: {
				height: '50',
				textAlign: 'right'
			},
			slots: { default: MANY_PARAGRAPHS }
		});

		expect(wrapper.vm.computedTextAlign).toBe('right');
	});
});
