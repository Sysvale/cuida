import { mount, createLocalVue } from '@vue/test-utils';
import lodash from 'lodash';
import { BootstrapVue, BAlert } from 'bootstrap-vue';
import StatusItem from '../../src/components/StatusItem.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	window._ = lodash;
	const wrapper = mount(StatusItem, {
		localVue,
		propsData: {
			title: 'Test title',
			subtitle: 'Test subtitle',
			variant: 'success',
			actionText: 'Test action',
			actionSubtitle: 'Test action subtitle',
			alertText: 'Test alert text',
		},
	});

	expect(wrapper).toMatchSnapshot();
});

describe('Action functioning', () => {
	test('If the action is shown when clickableAction is true', () => {
		window._ = lodash;
		const wrapper = mount(StatusItem, {
			localVue,
			propsData: {
				title: 'Test title',
				subtitle: 'Test subtitle',
				variant: 'success',
				actionText: 'Test action',
				actionSubtitle: 'Test action subtitle',
				alertText: 'Test alert text',
				clickableAction: true,
			},
		});

		expect(wrapper.findAll('.action--clickable').length).toBe(1);
		expect(wrapper.findAll('.action__subtitle').length).toBe(1);
	});

	test('If the action is not shown when clickableAction is false', () => {
		window._ = lodash;
		const wrapper = mount(StatusItem, {
			localVue,
			propsData: {
				title: 'Test title',
				subtitle: 'Test subtitle',
				variant: 'success',
				actionText: 'Test action',
				actionSubtitle: 'Test action subtitle',
				alertText: 'Test alert text',
			},
		});

		expect(wrapper.findAll('.action--clickable').length).toBe(0);
	});

	test('If an event is emitted when the action is clicked', () => {
		window._ = lodash;
		const wrapper = mount(StatusItem, {
			localVue,
			propsData: {
				title: 'Test title',
				subtitle: 'Test subtitle',
				variant: 'success',
				actionText: 'Test action',
				actionSubtitle: 'Test action subtitle',
				alertText: 'Test alert text',
				clickableAction: true,
			},
		});

		wrapper.find('.action--clickable').trigger('click');
		expect(wrapper.emitted()['action-clicked']).toBeTruthy();
	});
});

describe('Alert functioning', () => {
	test('If the alert is shown when showAlert is true', () => {
		window._ = lodash;
		const wrapper = mount(StatusItem, {
			localVue,
			propsData: {
				title: 'Test title',
				subtitle: 'Test subtitle',
				variant: 'success',
				actionText: 'Test action',
				actionSubtitle: 'Test action subtitle',
				alertText: 'Test alert text',
				showAlert: true,
			},
		});

		expect(wrapper.findAllComponents(BAlert).length).toBe(1);
	});

	test('If the action is not shown when showAlert is false', () => {
		window._ = lodash;
		const wrapper = mount(StatusItem, {
			localVue,
			propsData: {
				title: 'Test title',
				subtitle: 'Test subtitle',
				variant: 'success',
				actionText: 'Test action',
				actionSubtitle: 'Test action subtitle',
				alertText: 'Test alert text',
			},
		});

		expect(wrapper.findAllComponents(BAlert).length).toBe(0);
	});

	test('If an event is emitted when clickableAction is true and the alert is clicked', () => {
		window._ = lodash;
		const wrapper = mount(StatusItem, {
			localVue,
			propsData: {
				title: 'Test title',
				subtitle: 'Test subtitle',
				variant: 'error',
				actionText: 'Test action',
				actionSubtitle: 'Test action subtitle',
				alertText: 'Test alert text',
				showAlert: true,
				clickableAlert: true,
			},
		});

		wrapper.find('.alert--clickable').trigger('click');
		expect(wrapper.emitted()['alert-clicked']).toBeTruthy();
	});
});
