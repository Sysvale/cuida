import { computed } from 'vue';

export function useInputStatusClasses(baseClass, state, disabled, hasFocus) {
	return computed(() => {
		let inputStatusClass = '';
    
		if (!hasFocus.value) {
			inputStatusClass = `${baseClass}`;
    
			if (!disabled) {
				if (state === 'valid') {
					inputStatusClass += ` ${baseClass}--valid`;
				} else if (state === 'invalid') {
					inputStatusClass += ` ${baseClass}--invalid`;
				}
			} else {
				inputStatusClass += ` ${baseClass}--disabled`;
			}
		} else if (!disabled) {
			if (state === 'default') {
				inputStatusClass += ` ${baseClass}--focused`;
			} else if (state === 'valid') {
				inputStatusClass += ` ${baseClass}--focused-valid`;
			} else if (state === 'invalid') {
				inputStatusClass += ` ${baseClass}--focused-invalid`;
			}
		}
    
		return inputStatusClass;
	});
}
