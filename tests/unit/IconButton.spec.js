import { mount, createLocalVue } from '@vue/test-utils';

import IconButton from '../../src/components/IconButton.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(IconButton, {
		localVue,
		propsData: {
			icon: 'card-outline',
		},
		stubs: {
			'ion-icon': true,
		},
	});

	expect(wrapper).toMatchSnapshot();
});

describe('"variant" prop is validated', () => {
	const validator = IconButton.props.variant.validator;

	test('passes when "variant" is a predefined color', () => {
		expect(validator('turquoise')).toBe(true);
	});

	test('throws exception when "variant" is not a predefined color', () => {
		expect(validator('dummy')).toBe(false);
	});
});

describe('"size" prop is validated', () => {
	const validator = IconButton.props.size.validator;

	test('passes when "size" is a predefined size', () => {
		expect(validator('sm')).toBe(true);
	});

	test('throws exception when "size" is not a predefined size', () => {
		expect(validator('dummy')).toBe(false);
	});
});

test('IconButton emits an event when clicked', () => {
	const wrapper = mount(IconButton, {
		localVue,
		propsData: {
			icon: 'card-outline',
		},
		stubs: {
			'ion-icon': true,
		},
	});

	expect(wrapper.find('#cds-icon-button button').exists()).toBe(true);
	wrapper.find('#cds-icon-button button').trigger('click');

	expect(wrapper.emitted().click).toBeTruthy();
	expect(wrapper.emitted().click).toEqual([[true]]);
});
