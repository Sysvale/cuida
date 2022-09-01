import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import lodash from 'lodash';
import Tab from '../../src/components/Tab.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const mockedData = [
	{ title: 'Dummy title 1', name: 'dummy-1' },
	{ title: 'Dummy title 2', name: 'dummy-2' },
	{ title: 'Dummy title 3', name: 'dummy-3' },
	{ title: 'Dummy title 4', name: 'dummy-4' },
];

test('Component is mounted properly', () => {
	window._ = lodash;
	const wrapper = mount(Tab, {
		localVue,
		propsData: {
			tabs: mockedData,
			activeTab: mockedData[0],
		},
	});
	expect(wrapper).toMatchSnapshot();
});

describe('"tabs" prop is validated', () => {
	const validator = Tab.props.tabs.validator;

	test('passes when "tabs" has name and title', () => {
		expect(validator(mockedData)).toBe(true);
	});

	test('throws exception when some element of "tabs" has not title', () => {
		expect(validator([{ name: 'dummy-0' }, ...mockedData])).toBe(false);
	});

	test('throws exception when some element of "tabs" has not name', () => {
		expect(validator([{ title: 'Dummy title 0' }, ...mockedData])).toBe(false);
	});
});

describe('"activeColor" prop is validated', () => {
	const validator = Tab.props.activeColor.validator;

	test('passes when "activeColor" is a predefined color', () => {
		expect(validator('turquoise')).toBe(true);
	});

	test('throws exception when "activeColor" is not a predefined color', () => {
		expect(validator('dummy')).toBe(false);
	});
});

describe('Items styles test', () => {
	test('if has one tab set as active', () => {
		window._ = lodash;
		const wrapper = mount(Tab, {
			localVue,
			propsData: {
				tabs: mockedData,
				activeTab: mockedData[0],
			},
		});
		expect(wrapper.findAll('.active').length).toBe(1);
	});
});
