import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away-subtle.css';

export default {
	mounted(el, binding) {
		if (!binding.value || (typeof binding.value !== 'string' && !binding.value.content)) {
			return;
		}

		const content = typeof binding.value === 'string' ? binding.value : binding.value.content || '';

		el._tippyInstance = tippy(el, {
			content,
			arrow: false,
			animation: 'shift-away-subtle',
			delay: 100,
			allowHTML: true,
			...(binding.value.options || {}),
		});
	},

	updated(el, binding) {
		if (!binding.value || (typeof binding.value !== 'string' && !binding.value.content)) {
			if (el._tippyInstance) {
				el._tippyInstance.destroy();
				el._tippyInstance = null;
			}
			return;
		}

		const content = typeof binding.value === 'string' ? binding.value : binding.value.content || '';

		if (el._tippyInstance) {
			el._tippyInstance.setProps({
				content,
				...(binding.value.options || {}),
			});
		} else {
			el._tippyInstance = tippy(el, {
				content,
				arrow: false,
				animation: 'shift-away-subtle',
				delay: 100,
				allowHTML: true,
				...(binding.value.options || {}),
			});
		}
	},

	beforeUnmount(el) {
		if (el._tippyInstance) {
			el._tippyInstance.destroy();
			el._tippyInstance = null;
		}
	},
};
