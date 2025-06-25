import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Toast from '../components/Toast.vue'

describe('Toast', () => {
	test('renders correctly', () => {
		const wrapper = mount(Toast, {
			props: {
				modelValue: true,
			},
		})

		expect(wrapper.html()).toMatchSnapshot()
	})

	test('toast auto-dismisses after defined time', async () => {
		vi.useFakeTimers()

		const wrapper = mount(Toast, {
			props: {
				modelValue: true,
				autoDismissible: true,
				dismissAfter: 4000,
			},
		})

		expect(wrapper.vm.model).toBe(true)

		vi.advanceTimersByTime(4000)

		await wrapper.vm.$nextTick()

		expect(wrapper.emitted('dismiss')).toBeTruthy()

		vi.useRealTimers()
	})
})
