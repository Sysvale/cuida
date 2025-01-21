import { useSlots } from 'vue';

export function useHasSlots() {
	const slots = useSlots();
	return !!Object.keys(slots).length;
};
