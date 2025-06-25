export const vCdsBrl = {
	mounted(el, binding) {
		const formatValue = (value) => {
			if (value == 0) return 'R$ 0,00';
			if (!value) return '';

			let onlyNumbers = String(value).replace(/\D/g, '');
			if (!onlyNumbers) return 'R$ 0,00';

			let number = parseFloat(onlyNumbers) / 100;
			return number.toLocaleString('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			});
		};

		let isFormatting = false;

		const inputHandler = (event) => {
			if (isFormatting) return;

			isFormatting = true;

			let currentValue = String(event.target.value || '');

			let onlyNumbers = currentValue.replace(/\D/g, '');
			let number = parseFloat(onlyNumbers) / 100;

			const formattedValue = formatValue(currentValue);
			event.target.value = formattedValue;

			const inputEvent = new Event('input', { bubbles: true });

			Object.defineProperty(inputEvent, 'target', {
				value: { value: number },
				writable: false,
			});

			el.dispatchEvent(inputEvent);
			isFormatting = false;
		};

		el.addEventListener('input', inputHandler);

		el.value = formatValue(binding.value || '');

		el._inputHandler = inputHandler;
	},

	updated(el, binding) {
		const formatValue = (value) => {
			if (!value) return '';

			let onlyNumbers = String(value).replace(/\D/g, '');
			let number = parseFloat(onlyNumbers) / 100;

			return number.toLocaleString('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			});
		};

		el.value = formatValue(binding.value || '');
	},

	unmounted(el) {
		if (el._inputHandler) {
			el.removeEventListener('input', el._inputHandler);
		}
	},
};

export const unmaskBRL = (value) => {
	let sanitizedValue = value.replace('R$', '');
	sanitizedValue = sanitizedValue.replaceAll('.', '');
	sanitizedValue = sanitizedValue.replace(/(.*),(\d{2})/g, '$1.$2');

	return +sanitizedValue;
};
