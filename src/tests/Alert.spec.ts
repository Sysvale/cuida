// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import Alert from '../components/Alert.vue';
import { mount } from '@vue/test-utils';

describe('Alert snapshot test', () => {
	test('renders correctly', () => {
		const wrapper = mount(Alert, {
			props: {
				variant: 'info',
				text: 'Texto do alerta',
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
