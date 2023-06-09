import { createPopper } from '@popperjs/core';

export default (el, biding) => {
	let target = '';
	let popoverElement = '';
	let modifiers = biding.modifiers;
	let position = biding.arg;

	target = document.querySelector(`[id='${biding.value}']`);
	popoverElement = document.querySelector(`[id='${el.id}']`);

	createPopper(target, popoverElement, {
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
};
