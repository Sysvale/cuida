import { createPopper } from '@popperjs/core';

let popperInstance = null;
let observer = null;
let scrollHandler = null;
let resizeHandler = null;

const CdsFloatify = {
	mounted: (el, binding) => {
		const target = document.querySelector(`[id='${binding.value}']`);
		const popoverElement = document.querySelector(`[id='${el.id}']`);
		const modifiers = binding.modifiers;
		const position = binding.arg;

		if (target && popoverElement) {
			popperInstance = createPopper(target, popoverElement, {
				placement: position,
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, -4],
						},
					},
					{
						name: 'flip',
						enabled: !!modifiers.flip,
					},
				],
			});

			observer = new MutationObserver(() => {
				if (popperInstance) {
					popperInstance.update();
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});

			scrollHandler = () => {
				if (popperInstance) {
					popperInstance.update();
				}
			};

			resizeHandler = () => {
				if (popperInstance) {
					popperInstance.update();
				}
			};

			window.addEventListener('scroll', scrollHandler);
			window.addEventListener('resize', resizeHandler);
		}
	},
	beforeUnmount: () => {
		if (popperInstance) {
			popperInstance.destroy();
			popperInstance = null;
		}
		if (observer) {
			observer.disconnect();
			observer = null;
		}

		if(scrollHandler) {
			window.removeEventListener('scroll', scrollHandler);
		}

		if(resizeHandler) {
			window.removeEventListener('resize', resizeHandler);
		}
	},
};

export default CdsFloatify;
