import { ref, computed } from 'vue';

const internalHasFloatingLabel = ref(false);

export function direction(elementRef, height, hasFloatingLabel) {
	internalHasFloatingLabel.value = hasFloatingLabel;
	const direction = ref('down');
	let boundingRect = elementRef.value.getBoundingClientRect();

	if ((boundingRect.top + boundingRect.height + height) < window.innerHeight) {
		direction.value = 'down';
	} else {
		direction.value = 'up';
	}

	return direction.value;
}

export const dropdownTopPosition = computed(() => {
	return internalHasFloatingLabel.value ? '56px' : '72px';
});

export const dropdownBottomPosition = computed(() => {
	return internalHasFloatingLabel.value ? '76px' : '68px';
});
