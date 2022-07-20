import { mount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Spinner from '../../src/components/Spinner.vue';

const localVue = createLocalVue();

describe('Spinner', () => {
	test('if component is mounted correctly', () => {
		const wrapper = mount(Spinner, {
			localVue,
		});

		expect(wrapper).toMatchSnapshot();
	});

	test('if size is applied correctly', async () => {
		const wrapper = mount(Spinner, {
			localVue,
			propsData: {
				size: 'sm',
			},
		});

		await flushPromises();

		const spinner = wrapper.find('#spinner');

		expect(spinner.find('div').classes()).toContain('spinner--sm');
	});

	test('if variant is applied correctly', async () => {
		const wrapper = mount(Spinner, {
			localVue,
			propsData: {
				variant: 'red',
			},
		});

		await flushPromises();

		const spinner = wrapper.find('#spinner');

		expect(spinner.find('div').classes()).toContain('spinner--red');
	});

	test('if error is thrown on invalid prop', async () => {
		global.console = { error: jest.fn() };

		const spy = jest.spyOn(console, 'error');

		mount(Spinner, {
			localVue,
			propsData: {
				variant: '6 e ônibus',
			},
		});

		expect(spy).toHaveBeenCalledWith(expect.stringContaining('[Vue warn]: Invalid prop: custom validator check failed for prop "variant".'));
	});

	test('if title is shown correctly', async () => {
		const wrapper = mount(Spinner, {
			localVue,
			propsData: {
				withTitle: true,
				title: 'Ola amigos',
			},
		});

		await flushPromises();

		const title = wrapper.find('#title');

		expect(title.text()).toContain('Ola amigos');
	});

	test('if subtitle is shown correctly', async () => {
		const wrapper = mount(Spinner, {
			localVue,
			propsData: {
				withSubtitle: true,
				subtitle: 'bem amigos da rede globo',
			},
		});

		await flushPromises();

		const subtitle = wrapper.find('#subtitle');

		expect(subtitle.text()).toContain('bem amigos da rede globo');
	});
});
