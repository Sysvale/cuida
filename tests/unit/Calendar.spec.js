import { shallowMount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import lodash from 'lodash';
import Calendar from '../../src/components/Calendar.vue';
import VCalendar from 'v-calendar';
import _ from 'lodash';

const localVue = createLocalVue();

Object.defineProperty(localVue.prototype, '_', { value: _ });

localVue.use(VCalendar, {
	locales: {
		'pt-BR': {
			firstDayOfWeek: 1,
			masks: {
				L: 'YYYY-MM-DD',
			},
		},
	},
});

localVue.use(BootstrapVue);

const scheduleAttributes = {
	'08:00': {
		'08:00': false,
		'08:05': false,
		'08:10': false,
		'08:15': true,
		'08:20': true,
		'08:25': true,
		'08:30': true,
		'08:35': true,
		'08:40': true,
		'08:45': false,
		'08:50': false,
		'08:55': false,
	},
	'09:00': {
		'09:00': false,
		'09:05': false,
		'09:10': false,
		'09:15': true,
		'09:20': true,
		'09:25': true,
		'09:30': false,
		'09:35': false,
		'09:40': false,
		'09:45': false,
		'09:50': false,
		'09:55': false,
	},
	'10:00': {
		'10:00': false,
		'10:05': false,
		'10:10': false,
		'10:15': false,
		'10:20': false,
		'10:25': false,
		'10:30': false,
		'10:35': false,
		'10:40': false,
		'10:45': false,
		'10:50': false,
		'10:55': false,
	},
	'11:00': {
		'11:00': false,
		'11:05': false,
		'11:10': false,
		'11:15': false,
		'11:20': false,
		'11:25': false,
		'11:30': false,
		'11:35': false,
		'11:40': false,
		'11:45': false,
		'11:50': false,
		'11:55': false,
	},
	'12:00': {
		'12:00': false,
		'12:05': false,
		'12:10': false,
		'12:15': false,
		'12:20': false,
		'12:25': false,
		'12:30': false,
		'12:35': false,
		'12:40': false,
		'12:45': false,
		'12:50': false,
		'12:55': false,
	},
	'13:00': {
		'13:00': false,
		'13:05': false,
		'13:10': false,
		'13:15': false,
		'13:20': false,
		'13:25': false,
		'13:30': false,
		'13:35': false,
		'13:40': false,
		'13:45': false,
		'13:50': false,
		'13:55': false,
	},
	'14:00': {
		'14:00': true,
		'14:05': false,
		'14:10': false,
		'14:15': false,
		'14:20': false,
		'14:25': false,
		'14:30': false,
		'14:35': false,
		'14:40': false,
		'14:45': false,
		'14:50': false,
		'14:55': false,
	},
	'15:00': {
		'15:00': false,
		'15:05': false,
		'15:10': false,
		'15:15': false,
		'15:20': false,
		'15:25': false,
		'15:30': false,
		'15:35': false,
		'15:40': false,
		'15:45': false,
		'15:50': false,
		'15:55': false,
	},
	'16:00': {
		'16:00': false,
		'16:05': false,
		'16:10': false,
		'16:15': false,
		'16:20': false,
		'16:25': false,
		'16:30': false,
		'16:35': false,
		'16:40': false,
		'16:45': false,
		'16:50': false,
		'16:55': false,
	},
	'17:00': {
		'17:00': false,
		'17:05': false,
		'17:10': false,
		'17:15': false,
		'17:20': false,
		'17:25': false,
		'17:30': false,
		'17:35': false,
		'17:40': false,
		'17:45': false,
		'17:50': false,
		'17:55': false,
	},
	'18:00': {
		'18:00': false,
		'18:05': false,
		'18:10': false,
		'18:15': false,
		'18:20': true,
		'18:25': true,
		'18:30': true,
		'18:35': true,
		'18:40': false,
		'18:45': false,
		'18:50': false,
		'18:55': false,
	},
	'19:00': {
		'19:00': false,
		'19:05': false,
		'19:10': false,
		'19:15': false,
		'19:20': false,
		'19:25': false,
		'19:30': false,
		'19:35': false,
		'19:40': false,
		'19:45': false,
		'19:50': false,
		'19:55': false,
	},
};

test('Component is mounted properly', () => {
	window._ = lodash;
	const wrapper = shallowMount(Calendar, {
		localVue,
		propsData: {
			timePicker: true,
			scheduleAttributes,
		},
	});

	expect(wrapper).toMatchSnapshot();
});

test('If the invervals are shown when the hour is selected', async () => {
	window._ = lodash;
	const wrapper = shallowMount(Calendar, {
		localVue,
		propsData: {
			timePicker: true,
			scheduleAttributes,
		},
	});
	
	expect(wrapper.findAll('.schedule__time-interval').length).toBe(12);
	expect(wrapper.findAll('.schedule-skeleton').length).toBe(0);
	expect(wrapper.findAll('.schedule__minutes-container').length).toBe(0);

	wrapper.find('.schedule__time-interval').trigger('click');

	await localVue.nextTick();

	expect(wrapper.findAll('.schedule__minutes-container').length).toBe(1);
});

test('If the skeleton are shown when there is no data in the configuration object', async () => {
	window._ = lodash;
	const wrapper = shallowMount(Calendar, {
		localVue,
		propsData: {
			timePicker: true,
			scheduleAttributes: {},
		},
	});
	
	expect(wrapper.findAll('.schedule-skeleton').length).toBe(12);
});