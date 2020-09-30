import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Timeline from '../../src/components/Timeline.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const history = [
	{
		date: '22/09/2020',
		title: 'Bloqueio nível 1',
		text: 'Usuário: Uncle Bob',
	},
	{
		date: '22/09/2020',
		title: 'Bloqueio nível 1',
		text: 'Usuário: Uncle Bob',
	},
	{
		date: '22/09/2020',
		title: 'Bloqueio nível 1',
		text: 'Usuário: Uncle Bob',
	},
];

test('Component is mounted properly', () => {
	const wrapper = mount(Timeline, {
		localVue,
		propsData: {
			history: history,
		},
	});

	expect(wrapper).toMatchSnapshot();
});

test('If the number of rows are the same of the length of the array', () => {
	const wrapper = mount(Timeline, {
		localVue,
		propsData: {
			history: history,
		},
	});
	
	expect(wrapper.findAll('.event-row').length).toBe(history.length);
});

test('If the UI elements of the timeline are displayed properly', () => {
	const wrapper = mount(Timeline, {
		localVue,
		propsData: {
			history: history,
		},
	});

	expect(wrapper.findAll('.event-pin').length).toBe(history.length);
	expect(wrapper.findAll('.timeline').length).toBe(history.length - 1);
	expect(wrapper.findAll('.event-row-divider').length).toBe(history.length - 1);
});
