export function nativeEmits(emits = null) {
	const emitBlur = () => emits('blur');
	const emitChange = () => emits('change');
	const emitClick = (event) => emits('click', event);
	const emitFocus = () => emits('focus');
	const emitKeydown = (event) => emits('keydown', event);
	const emitMouseenter = () => emits('mouseenter');
	const emitMouseleave = () => emits('mouseleave');

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
