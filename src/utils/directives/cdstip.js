import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away-subtle.css';

export default (el, binding) => {
	setTimeout(() => {
		const generateRandomId = () => {
			const s4 = () => {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			};

			return `${s4()}-${s4()}`;
		};

		if (binding.value === null || binding.value === undefined) return;

		const tippyId = generateRandomId();
		el.setAttribute('data-tippy', tippyId);

		const elementQueryString = `${el.tagName.toLowerCase()}[data-tippy="${tippyId}"]`;

		tippy(elementQueryString, {
			content: binding.value,
			arrow: false,
			animation: 'shift-away-subtle',
			delay: 100,
		});
	}, 500);
};
