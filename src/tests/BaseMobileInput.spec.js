import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseMobileInput from '../components/BaseMobileInput.vue';
import CdsLink from '../components/Link.vue';
import CdsIcon from '../components/Icon.vue';
import CdsSpinner from '../components/Spinner.vue';
import CdsRequiredIndicator from '../components/RequiredIndicator.vue';

describe('BaseMobileInput', () => {
	test('renders correctly', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('renders correctly with default props', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
			}
		});
		expect(wrapper.find('input').exists()).toBe(true);
		expect(wrapper.find('label').text()).toBe('Nome');
	});

	test('renders with a required indicator', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				required: true,
			},
		});
		expect(wrapper.findComponent(CdsRequiredIndicator).exists()).toBe(true);
	});

	test('renders with disabled attribute when disabled prop is true', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				disabled: true,
			},
		});

		const input = wrapper.find('input');
		expect(input.attributes('disabled')).toBeDefined();
	});

	test('does not render with disabled attribute when disabled prop is false', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				disabled: false,
			},
		});

		const input = wrapper.find('input');
		expect(input.attributes('disabled')).toBeUndefined();
	});

	test('does not allow input interaction when disabled is true', async () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				disabled: true,
			},
		});
	
		const input = wrapper.find('input');
	
		expect(input.attributes('disabled')).toBeDefined();
	
		await input.trigger('input');
		await input.trigger('change');
	
		expect(input.element.value).toBe('');
	});

	test('applies disabled class when disabled is true', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				disabled: true,
			},
		});

		const inputContainer = wrapper.find('.base-mobile-input');
		expect(inputContainer.classes()).toContain('base-mobile-input--disabled');
	});

	test('applies fluid class and styles when fluid prop is true', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				fluid: true,
			},
		});

		const inputContainer = wrapper.find('.base-mobile-input--fluid');

		expect(inputContainer.exists()).toBe(true);
	});

	test('applies default class and styles when state is default', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				state: 'default',
			},
		});

		const inputContainer = wrapper.find('.base-mobile-input');

		expect(inputContainer.classes()).toContain('base-mobile-input--default');
	});

	test('applies valid class and styles when state is valid', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				state: 'valid',
			},
		});

		const inputContainer = wrapper.find('.base-mobile-input');

		expect(inputContainer.classes()).toContain('base-mobile-input--valid');
	});

	test('applies invalid class and styles when state is invalid', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				state: 'invalid',
			},
		});

		const inputContainer = wrapper.find('.base-mobile-input');

		expect(inputContainer.classes()).toContain('base-mobile-input--invalid');
	});

	test('renders with a custom label', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				label: 'Custom Label',
			},
		});
		expect(wrapper.find('label').text()).toBe('Custom Label');
	});

	test('renders with a leading icon', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				leadingIcon: 'search-outline',
				hasLeadingIcon: true,
			},
		});
		expect(wrapper.findComponent(CdsIcon).exists()).toBe(true);
		expect(wrapper.findComponent(CdsIcon).props('name')).toBe('search-outline');
	});

	test('renders with a trailing icon', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				trailingIcon: 'calendar-outline',
				hasTrailingIcon: true,
			},
		});
		expect(wrapper.findComponent(CdsIcon).exists()).toBe(true);
		expect(wrapper.findComponent(CdsIcon).props('name')).toBe('calendar-outline');
	});

	test('renders with a spinner when loading', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				state: 'loading',
			},
		});
		expect(wrapper.findComponent(CdsSpinner).exists()).toBe(true);
	});

	test('renders with an error message', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				state: 'invalid',
				errorMessage: 'Invalid input',
			},
		});
		expect(wrapper.find('.base-mobile-input__error-message').text()).toBe('Invalid input');
	});

	test('emits click event when clicked', async () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
			}
		});
		await wrapper.find('input').trigger('click');
		expect(wrapper.emitted('click')).toBeTruthy();
	});

	test('emits focus event when focused', async () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
			}
		});
		await wrapper.find('input').trigger('focus');
		expect(wrapper.emitted('focus')).toBeTruthy();
	});

	test('emits blur event when blurred', async () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
			}
		});
		await wrapper.find('input').trigger('blur');
		expect(wrapper.emitted('blur')).toBeTruthy();
	});

	test('updates the model value when input changes', async () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
			}
		});
		const input = wrapper.find('input');
		await input.setValue('new value');
		expect(wrapper.vm.internalValue).toBe('new value');
	});

	test('emits keydown event when a key is pressed', async () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
			}
		});

		const input = wrapper.find('input');

		await input.trigger('keydown', { key: 'Enter' });

		expect(wrapper.emitted('keydown')).toBeTruthy();
		expect(wrapper.emitted('keydown')[0][0].key).toBe('Enter');
	});

	test('emits keydown event with correct key data', async () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
			}
		});

		const input = wrapper.find('input');

		await input.trigger('keydown', { key: 'Escape' });

		expect(wrapper.emitted('keydown')[0][0].key).toBe('Escape');
	});

	test('renders with a support link', () => {
		const wrapper = mount(BaseMobileInput, {
			props: {
				id: 'base-mobile-input',
				supportLink: 'Support Link',
				supportLinkUrl: 'https://example.com',
			},
		});
		expect(wrapper.findComponent(CdsLink).exists()).toBe(true);
		expect(wrapper.findComponent(CdsLink).props('text')).toBe('Support Link');
		expect(wrapper.findComponent(CdsLink).props('href')).toBe('https://example.com');
	});
});
