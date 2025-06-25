import { ref, onMounted, onUnmounted } from 'vue'

export function useClickOutside(options = {}) {
	const clickedOutside = ref(options.initialState || false)
  
	let targetElement = null

	const handleClickOutside = (event) => {
		if (!targetElement) return
    
		clickedOutside.value = !targetElement.contains(event.target);
	}

	const setTargetElement = (element) => {
		targetElement = element
	}

	onMounted(() => {
		document.addEventListener('click', handleClickOutside)
		document.addEventListener('touchend', handleClickOutside)
	})

	onUnmounted(() => {
		document.removeEventListener('click', handleClickOutside)
		document.removeEventListener('touchend', handleClickOutside)
	})

	return {
		clickedOutside,
		setTargetElement
	}
}
