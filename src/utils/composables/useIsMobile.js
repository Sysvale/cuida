import { computed } from 'vue';
import isDeviceType from '../methods/isDeviceType';

export default function() {
	const isMobile = computed(() => {
		return isDeviceType('smartphone') || isDeviceType('tablet');
	});

	return { isMobile };
}
