import { mount, createLocalVue } from '@vue/test-utils';
import Spinner from '../../src/components/Spinner.vue';

const localVue = createLocalVue();

describe('Spinner', () => {
	test('if component is mounted correctly', () => {
		const wrapper = mount(Spinner, {
			localVue,
		});

		expect(wrapper).toMatchSnapshot();
	});
});
