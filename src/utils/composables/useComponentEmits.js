export function nativeEmits(emits = null) {
	const emitBlur = (event) => emits('blur', event);
	const emitChange = (event) => emits('change', event);
	const emitClick = (event) => emits('click', event);
	const emitFocus = (event) => emits('focus', event);
	const emitKeydown = (event) => emits('keydown', event);
	const emitMouseenter = (event) => emits('mouseenter', event);
	const emitMouseleave = (event) => emits('mouseleave', event);

	return {
		emitBlur,
		emitChange,
		emitClick,
		emitFocus,
		emitKeydown,
		emitMouseenter,
		emitMouseleave,
	};
}

export const nativeEvents = {
	'blur': null,
	'change': null,
	'click': null,
	'focus': null,
	'keydown': null,
	'mouseenter': null,
	'mouseleave': null,
};
