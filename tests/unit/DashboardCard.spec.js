import { mount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import DashboardCard from '../../src/components/DashboardCard.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(DashboardCard, {
		localVue,
		propsData: {
			title: 'Card title',
			description: 'Card description',
			showAction: true,
			action: 'See more',
		},
	});

	expect(wrapper).toMatchSnapshot();
});

test('action-button-click event is emitted correctly', async () => {
	const wrapper = mount(DashboardCard, {
		localVue,
		propsData: {
			title: 'Card title',
			description: 'Card description',
			showAction: true,
			action: 'See more',
		},
	});

	wrapper.find('.dashboard-card__action').trigger('click');

	await flushPromises();

	expect(wrapper.emitted('action-button-click')).toBeTruthy();
})