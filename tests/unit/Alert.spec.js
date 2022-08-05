import { mount, createLocalVue } from '@vue/test-utils';
import Alert from '../../src/components/Alert.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(Alert, {
		localVue,
		propsData: {
			text: '',
		},
		stubs: {
			'ion-icon': true,
		},
	});

	expect(wrapper).toMatchSnapshot();
});

test('Close event is emited properly when the icon is pressed', () => {
	const wrapper = mount(Alert, {
		localVue,
		propsData: {
			text: 'Título do alert',
			dismissible: true,
		},
		stubs: {
			'ion-icon': true,
		},
	});

	const closeButton = wrapper.find('.alert__close-button');

	expect(closeButton.exists()).toBe(true);
	closeButton.trigger('click');

	expect(wrapper.emitted().close).toBeTruthy();
});

describe('Variant tests', () => {
	test('Info variant style', () => {
		const wrapper = mount(Alert, {
			localVue,
			propsData: {
				text: 'Título do alert',
				variant: 'info',
			},
			stubs: {
				'ion-icon': true,
			},
		});

		const infoAlert = wrapper.find('.alert__container--info');
		const successAlert = wrapper.find('.alert__container--success');
		const warningAlert = wrapper.find('.alert__container--warning');
		const dangerAlert = wrapper.find('.alert__container--danger');

		expect(infoAlert.exists()).toBe(true);
		expect(successAlert.exists()).toBe(false);
		expect(warningAlert.exists()).toBe(false);
		expect(dangerAlert.exists()).toBe(false);
	});

	test('Success variant style', () => {
		const wrapper = mount(Alert, {
			localVue,
			propsData: {
				text: 'Título do alert',
				variant: 'success',
			},
			stubs: {
				'ion-icon': true,
			},
		});

		const infoAlert = wrapper.find('.alert__container--info');
		const successAlert = wrapper.find('.alert__container--success');
		const warningAlert = wrapper.find('.alert__container--warning');
		const dangerAlert = wrapper.find('.alert__container--danger');

		expect(infoAlert.exists()).toBe(false);
		expect(successAlert.exists()).toBe(true);
		expect(warningAlert.exists()).toBe(false);
		expect(dangerAlert.exists()).toBe(false);
	});

	test('Warning variant style', () => {
		const wrapper = mount(Alert, {
			localVue,
			propsData: {
				text: 'Título do alert',
				variant: 'warning',
			},
			stubs: {
				'ion-icon': true,
			},
		});

		const infoAlert = wrapper.find('.alert__container--info');
		const successAlert = wrapper.find('.alert__container--success');
		const warningAlert = wrapper.find('.alert__container--warning');
		const dangerAlert = wrapper.find('.alert__container--danger');

		expect(infoAlert.exists()).toBe(false);
		expect(successAlert.exists()).toBe(false);
		expect(warningAlert.exists()).toBe(true);
		expect(dangerAlert.exists()).toBe(false);
	});

	test('Danger variant style', () => {
		const wrapper = mount(Alert, {
			localVue,
			propsData: {
				text: 'Título do alert',
				variant: 'danger',
			},
			stubs: {
				'ion-icon': true,
			},
		});

		const infoAlert = wrapper.find('.alert__container--info');
		const successAlert = wrapper.find('.alert__container--success');
		const warningAlert = wrapper.find('.alert__container--warning');
		const dangerAlert = wrapper.find('.alert__container--danger');

		expect(infoAlert.exists()).toBe(false);
		expect(successAlert.exists()).toBe(false);
		expect(warningAlert.exists()).toBe(false);
		expect(dangerAlert.exists()).toBe(true);
	});
});
