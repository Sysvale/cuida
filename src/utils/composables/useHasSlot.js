import { useSlots } from 'vue';

export function useHasSlot (slotName) {
	const slots = useSlots();
	return Object.keys(slots).some((slot) => slot === slotName);
}
