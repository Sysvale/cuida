import { describe, test, expect } from 'vitest';
import TextInput from '../components/TextInput.vue';
import { mount } from '@vue/test-utils';

const mockedData = [
	{ title: 'Dummy title 1', name: 'dummy-1' },
	{ title: 'Dummy title 2', name: 'dummy-2' },
	{ title: 'Dummy title 3', name: 'dummy-3' },
	{ title: 'Dummy title 4', name: 'dummy-4' },
];

describe('TextInput', () => {
	test('renders correctly', async () => {
		const wrapper = mount(TextInput, {
			props: {
				tabs: mockedData,
				activeTab: mockedData[0],
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
