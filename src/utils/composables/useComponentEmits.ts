export function nativeEmits(emits) {
	const emitBlur = (event?: FocusEvent) => emits('blur', event);
	const emitChange = (event?: Event) => emits('change', event);
	const emitClick = (event?: MouseEvent) => emits('click', event);
	const emitFocus = (event?: FocusEvent) => emits('focus', event);
	const emitKeydown = (event?: KeyboardEvent) => emits('keydown', event);
	const emitMouseenter = (event?: MouseEvent) => emits('mouseenter', event);
	const emitMouseleave = (event?: MouseEvent) => emits('mouseleave', event);

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

export type NativeEvents = {
	(event: 'blur'): void;
	(event: 'change'): void;
	(event: 'click'): void;
	(event: 'focus'): void;
	(event: 'keydown'): void;
	(event: 'mouseenter'): void;
	(event: 'mouseleave'): void;
};
