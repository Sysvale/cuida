import { describe, test, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ToastContainer from '../components/ToastContainer.vue'
import CdsToast from '../components/Toast.vue'

vi.mock('../utils/composables/useToast.js', () => {
	return {
		toastState: {
			toasts: [
				{
					id: '1',
					title: 'Sucesso',
					description: 'Ação realizada com sucesso!',
					dismissible: true,
					autoDismissible: true,
					dismissAfter: 5000,
					variant: 'success',
					light: false,
				},
				{
					id: '2',
					title: 'Erro',
					description: 'Algo deu errado.',
					dismissible: false,
					autoDismissible: false,
					dismissAfter: 6000,
					variant: 'danger',
					light: true,
				},
			]
		}
	}
})

describe('ToastContainer snapshot test', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(ToastContainer);

		expect(wrapper.html()).toMatchSnapshot();
	});
});

describe('ToastContainer', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(ToastContainer)
	})

	test('renders the correct number of toasts', () => {
		const toasts = wrapper.findAllComponents(CdsToast)
		expect(toasts.length).toBe(2)
	})

	test('passes props correctly to toasts', () => {
		const toast = wrapper.findAllComponents(CdsToast)[0]
		expect(toast.props('title')).toBe('Sucesso')
		expect(toast.props('variant')).toBe('success')
		expect(toast.props('dismissible')).toBe(true)
	})
})
