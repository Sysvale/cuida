import { describe, test, expect } from 'vitest';
import DialogModal from '../components/DialogModal.vue';
import { mount } from '@vue/test-utils';

describe('DialogModal', () => {
	test('renders correctly', async () => {
		const wrapper = mount(DialogModal, {
			props: {
				modelValue: true,
				title: 'Olá, mundo!',
				description: 'Esta ação afetará o sistema e os arquivos associados.',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
