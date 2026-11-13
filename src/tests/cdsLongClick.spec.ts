import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { defineComponent, h, withDirectives } from 'vue';
import { mount } from '@vue/test-utils';
import { longClickDirective } from '../utils/directives/cdsLongClick';

const DELAY = 400;
const INTERVAL = 50;

function mountWithLongClick(handler: unknown, options = { delay: DELAY, interval: INTERVAL }) {
	const directive = longClickDirective(options);
	const component = defineComponent({
		render: () => withDirectives(h('button'), [[directive, handler]]),
	});

	return mount(component, { attachTo: document.body });
}

describe('longClickDirective', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test('chama a função após o delay e repete a cada intervalo enquanto pressionado', async () => {
		const handler = vi.fn();
		const wrapper = mountWithLongClick(handler);

		await wrapper.trigger('mousedown');
		vi.advanceTimersByTime(DELAY - 1);
		expect(handler).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(handler).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(INTERVAL * 3);
		expect(handler).toHaveBeenCalledTimes(4);
		expect(handler.mock.calls[0][0]).toBeInstanceOf(Event);

		wrapper.unmount();
	});

	test.each(['click', 'mouseout', 'touchend', 'touchcancel'])('para de chamar a função no evento %s', async (cancelEvent) => {
		const handler = vi.fn();
		const wrapper = mountWithLongClick(handler);

		await wrapper.trigger('mousedown');
		vi.advanceTimersByTime(DELAY + INTERVAL);
		expect(handler).toHaveBeenCalledTimes(2);

		await wrapper.trigger(cancelEvent);
		vi.advanceTimersByTime(INTERVAL * 5);
		expect(handler).toHaveBeenCalledTimes(2);

		wrapper.unmount();
	});

	test('não chama a função num clique curto', async () => {
		const handler = vi.fn();
		const wrapper = mountWithLongClick(handler);

		await wrapper.trigger('mousedown');
		vi.advanceTimersByTime(DELAY / 2);
		await wrapper.trigger('click');
		vi.advanceTimersByTime(DELAY * 2);

		expect(handler).not.toHaveBeenCalled();

		wrapper.unmount();
	});

	test('funciona com toque', async () => {
		const handler = vi.fn();
		const wrapper = mountWithLongClick(handler);

		await wrapper.trigger('touchstart');
		vi.advanceTimersByTime(DELAY);

		expect(handler).toHaveBeenCalledTimes(1);

		wrapper.unmount();
	});

	test('não inicia um segundo temporizador se já estiver pressionado', async () => {
		const handler = vi.fn();
		const wrapper = mountWithLongClick(handler);

		await wrapper.trigger('mousedown');
		await wrapper.trigger('touchstart');
		vi.advanceTimersByTime(DELAY + INTERVAL);

		expect(handler).toHaveBeenCalledTimes(2);

		wrapper.unmount();
	});

	test('chama a função uma única vez quando o intervalo é 0', async () => {
		const handler = vi.fn();
		const wrapper = mountWithLongClick(handler, { delay: DELAY, interval: 0 });

		await wrapper.trigger('mousedown');
		vi.advanceTimersByTime(DELAY * 5);

		expect(handler).toHaveBeenCalledTimes(1);

		wrapper.unmount();
	});

	test('interrompe a repetição e remove os listeners ao desmontar', async () => {
		const handler = vi.fn();
		const wrapper = mountWithLongClick(handler);
		const button = wrapper.element;

		await wrapper.trigger('mousedown');
		vi.advanceTimersByTime(DELAY);
		expect(handler).toHaveBeenCalledTimes(1);

		wrapper.unmount();
		vi.advanceTimersByTime(INTERVAL * 5);
		button.dispatchEvent(new Event('mousedown'));
		vi.advanceTimersByTime(DELAY * 2);

		expect(handler).toHaveBeenCalledTimes(1);
	});

	test('avisa no console quando o valor não é uma função', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const wrapper = mountWithLongClick('nao-e-funcao');

		expect(warn).toHaveBeenCalledWith('[v-long-click] o valor da diretiva precisa ser uma função');

		warn.mockRestore();
		wrapper.unmount();
	});
});
