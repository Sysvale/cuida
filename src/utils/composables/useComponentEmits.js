export function nativeEmits(emits = null) {
	const emitBlur = () => emits('blur');
	const emitFocus = () => emits('focus');
	const emitChange = () => emits('change');
	const emitClick = () => emits('click');
	const emitMouseenter = () => emits('mouseenter');
	const emitMouseleave = () => emits('mouseleave');

	return {
		emitBlur,
		emitFocus,
		emitChange,
		emitClick,
		emitMouseenter,
		emitMouseleave
	};
}

export const nativeEvents = {
	'blur': null,
	'focus': null,
	'change': null,
	'click': null,
	'mouseenter': null,
	'mouseleave': null,
};
