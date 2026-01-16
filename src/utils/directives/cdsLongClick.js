export const longClickDirective = (options = {}) => {
	const delay = options.delay || 400;
	const interval = options.interval || 50;

	return {
		mounted(el, binding) {
			let timer = null;
			let intervalTimer = null;

			const start = (e) => {
				// Only left click
				if (e.type === 'mousedown' && e.button !== 0) return;

				if (timer === null) {
					timer = setTimeout(() => {
						intervalTimer = setInterval(() => {
							binding.value(e);
						}, interval);
					}, delay);
				}
			};

			const cancel = () => {
				if (timer !== null) {
					clearTimeout(timer);
					timer = null;
				}
				if (intervalTimer !== null) {
					clearInterval(intervalTimer);
					intervalTimer = null;
				}
			};

			el._cdsLongClickStart = start;
			el._cdsLongClickCancel = cancel;

			el.addEventListener('mousedown', start);
			el.addEventListener('touchstart', start, { passive: true });
			el.addEventListener('click', cancel);
			el.addEventListener('mouseout', cancel);
			el.addEventListener('touchend', cancel);
			el.addEventListener('touchcancel', cancel);
		},
		unmounted(el) {
			const start = el._cdsLongClickStart;
			const cancel = el._cdsLongClickCancel;

			el.removeEventListener('mousedown', start);
			el.removeEventListener('touchstart', start);
			el.removeEventListener('click', cancel);
			el.removeEventListener('mouseout', cancel);
			el.removeEventListener('touchend', cancel);
			el.removeEventListener('touchcancel', cancel);

			delete el._cdsLongClickStart;
			delete el._cdsLongClickCancel;
		}
	};
};
