import { describe, test, expect } from 'vitest';
import PasswordInput from '../components/PasswordInput.vue';
import { mount } from '@vue/test-utils';

describe('PasswordInput', () => {
	test('If component renders correctly', () => {
		const wrapper = mount(PasswordInput, {
			props: {},
		});

		expect(wrapper).toMatchSnapshot();
	});
});

describe('PasswordInput with disabled prop', () => {
	test('If custom text from PasswordInput is not rendered with field disabled', () => {
		const wrapper = mount(PasswordInput, {
			props: {
				disabled: true,
			},
		});

		expect(wrapper.find('.password-input__password-toogle').exists()).toBe(false);
	});

	test('If custom text from PasswordInput is rendered', () => {
		const wrapper = mount(PasswordInput, {
			props: {
				disabled: false,
			},
		});

		expect(wrapper.find('.password-input__password-toogle').exists()).toBe(true);
	});
});

describe('PasswordInput event', () => {
	test('If CdsClickable emits an event when clicked', () => {
		const wrapper = mount(PasswordInput, {
			props: {},
		});

		wrapper.find('#cds-clickable').trigger('click');

		expect(wrapper.emitted().click).toBeTruthy();
	});
});

describe('Slots in PasswordInput', () => {
	test('If slots are rendered', () => {
		const slotHeader = {
			render() {
				return 'Custom Label';
			},
		}
        
		const wrapper = mount(PasswordInput, {
			props: {
				disabled: false,
			},
			slots: {
				slotHeader,
			},
		});

		expect(wrapper.findComponent(slotHeader)).toBeTruthy();
	});
});
