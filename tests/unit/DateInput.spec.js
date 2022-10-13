import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import { setupCalendar } from 'v-calendar';
// eslint-disable-next-line import/no-unresolved
import { DateTime, Settings } from 'luxon';
import flushPromises from 'flush-promises';
import DateInput from '../../src/components/DateInput.vue';

const localVue = createLocalVue();

setupCalendar({
	locales: {
		'pt-BR': {
			firstDayOfWeek: 1,
			masks: {
				L: 'YYYY-MM-DD',
			},
		},
	},
});

beforeEach(() => {
	const expectedNow = DateTime.local(2022, 10, 13);
	Settings.now = () => expectedNow.toMillis();
});

test('Component is mounted properly', () => {
	const wrapper = shallowMount(DateInput, {
		localVue,
	});

	expect(wrapper).toMatchSnapshot();
});

test('if fluid class is applied based on prop', async () => {
	const wrapper = mount(DateInput, {
		localVue,
		propsData: {
			fluid: true,
		},
	});

	await flushPromises();

	expect(wrapper.find('.date-input--fluid').exists()).toBeTruthy();
});

test('if availableDates is being mounted correctly', async () => {
	const minDate = '2022-08-05';
	const maxDate = '2022-09-18';
	const wrapper = mount(DateInput, {
		localVue,
		propsData: {
			fluid: true,
			minDate,
			maxDate,
		},
	});

	await flushPromises();

	expect(wrapper.vm.availableDates).toMatchObject({
		start: DateTime.fromISO(minDate),
		end: DateTime.fromISO(maxDate),
	});
});

test('if data is emitted correctly', async () => {
	const wrapper = mount(DateInput, {
		localVue,
		propsData: {
			fluid: true,
		},
	});

	await flushPromises();

	await wrapper.find('#cds-date-input').vm.$emit('input', new Date());

	expect(wrapper.emitted('input')).toContainEqual([
		DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
	]);
});
