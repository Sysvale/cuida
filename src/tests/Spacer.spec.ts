// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import Spacer from '../components/Spacer.vue';
import { mount } from '@vue/test-utils';

describe('Spacer snapshot test', () => {
	test('renders correctly', () => {
		const wrapper = mount(Spacer, {
			props: {
				paddingTop: 0,
				paddingRight: 0,
				paddingBottom: 0,
				paddingLeft: 0,
				marginTop: 0,
				marginRight: 0,
				marginBottom: 0,
				marginLeft: 0,
			},
			slots: {
				default: '<div style="width: 100px; height: 100px; background-color: #2AC092; border-radius: 20px"/>'
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
