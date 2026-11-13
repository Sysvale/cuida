const START_EVENTS = ['mousedown', 'touchstart'];
const CANCEL_EVENTS = ['click', 'mouseout', 'touchend', 'touchcancel'];
const LISTENER_OPTIONS = { passive: true };
const HANDLERS_PROPERTY = '__cds-long-click';

function addListeners(el, { start, cancel }) {
	START_EVENTS.forEach((eventName) => el.addEventListener(eventName, start, LISTENER_OPTIONS));
	CANCEL_EVENTS.forEach((eventName) => el.addEventListener(eventName, cancel, LISTENER_OPTIONS));
}

function removeListeners(el, { start, cancel }) {
	START_EVENTS.forEach((eventName) => el.removeEventListener(eventName, start, LISTENER_OPTIONS));
	CANCEL_EVENTS.forEach((eventName) => el.removeEventListener(eventName, cancel, LISTENER_OPTIONS));
}

/**
 * Cria a diretiva de clique longo: enquanto o elemento é pressionado, chama a
 * função recebida uma vez após `delay` ms e, depois, a cada `interval` ms.
 * Com `interval` 0, a função é chamada só uma vez.
 */
export const longClickDirective = ({ delay = 400, interval = 50 } = {}) => ({
	beforeMount(el, binding) {
		if (typeof binding.value !== 'function') {
			console.warn('[v-long-click] o valor da diretiva precisa ser uma função');
		}

		let pressTimer = null;
		let pressInterval = null;

		const handle = (event) => binding.value(event);

		const start = (event) => {
			if (pressTimer !== null) {
				return;
			}

			pressTimer = setTimeout(() => {
				if (interval > 0) {
					pressInterval = setInterval(() => handle(event), interval);
				}
				handle(event);
			}, delay);
		};

		const cancel = () => {
			clearTimeout(pressTimer);
			clearInterval(pressInterval);
			pressTimer = null;
			pressInterval = null;
		};

		el[HANDLERS_PROPERTY] = { start, cancel };
		addListeners(el, el[HANDLERS_PROPERTY]);
	},

	unmounted(el) {
		const handlers = el[HANDLERS_PROPERTY];

		handlers.cancel();
		removeListeners(el, handlers);
		delete el[HANDLERS_PROPERTY];
	},
});
