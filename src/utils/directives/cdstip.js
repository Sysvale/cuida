import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away-subtle.css';

export default {
	mounted(el, binding) {
		if (!binding.value || (typeof binding.value !== 'string' && !binding.value.content)) {
			return;
		}

		const generateRandomId = () => {
			const s4 = () =>
				Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			return `${s4()}-${s4()}`;
		};

		const tippyId = generateRandomId();
		el.setAttribute('data-tippy', tippyId);

		el._tippyInstance = tippy(el, {
			content: typeof binding.value === 'string' ? binding.value : binding.value?.content || '',
			arrow: false,
			animation: 'shift-away-subtle',
			delay: 100,
			allowHTML: true,
			...binding.value.options || {},
		});
	},

	updated(el, binding) {
		if (el._tippyInstance) {
			el._tippyInstance.setProps({
				content: binding.value.content || '',
				...binding.value.options,
			});
		}
	},

	unmounted(el) {
		if (el._tippyInstance) {
			el._tippyInstance.destroy();
		}
	},
};
