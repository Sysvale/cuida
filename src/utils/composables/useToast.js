import generateKey from '../methods/uuidv4';
import { reactive } from 'vue'

export const toastState = reactive({
	toasts: [],
});

export function useToast() {
	function fire({
		title,
		description = null,
		variant = 'info',
		dismissible = true,
		dismissAfter = 4000,
		autoDismissible = true,
		light = false,
	}) {
		const id = generateKey();

		toastState.toasts.push({
			id,
			title,
			description,
			variant,
			dismissible,
			dismissAfter,
			autoDismissible,
			light,
		});

		if (autoDismissible) {
			setTimeout(() => {
				dismissToast(id);
			}, dismissAfter);
		}
	}

	function dismissToast(id) {
		const index = toastState.toasts.findIndex((toast) => toast.id === id);
		if (index !== -1) toastState.toasts.splice(index, 1);
	}

	return {
		toastState,
		fire,
		dismissToast,
	}
}
