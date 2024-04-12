import { describe, test, expect } from 'vitest';
import Timeline from '../components/Timeline.vue';
import { mount } from '@vue/test-utils';

const history = [
	{
		date: '22/09/2022',
		title: 'Bloqueio nível 1',
		text: 'Usuário: Uncle Bob',
		_dotStyle: 'hollowed',
	},
	{
		date: '15/05/2022',
		title: 'Bloqueio nível 2',
		text: 'Usuário: Linus Torvalds',
		_dotStyle: 'hollowed',
	},
	{
		date: '18/02/2022',
		title: 'Bloqueio nível 1',
		text: 'Usuário: Don Norman',
	},
	{
		date: '20/12/2021',
		title: 'Bloqueio nível 3',
		text: 'Usuário: Richard Stallman',
		_dotStyle: 'filled',
	},
	{
		date: '04/11/2021',
		title: 'Bloqueio nível 1',
		text: 'Usuário: Dennis Ritchie',
	},
];

describe('Timeline', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Timeline, {
			props: {
				history,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
