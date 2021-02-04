import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import FilterPill from '../../src/components/FilterPill.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	const wrapper = mount(FilterPill, {
		localVue,
		propsData: {
			label: 'Idade',
			content: '0 a 120 anos',
		}
	});

	expect(wrapper).toMatchSnapshot();
});

describe("Click tests", () => {
	test("if the click event is emitted properly when the filterPill is clicked'", () => {
		const wrapper = mount(FilterPill, {
			localVue,
			propsData: {
				label: 'Idade',
				content: '0 a 120 anos',
			}
		});

		expect(wrapper.find('.filter-pill__container').exists()).toBe(true);
		wrapper.find('.filter-pill__container').trigger('click');

		expect(wrapper.emitted().click).toBeTruthy();
		expect(wrapper.emitted().click).toEqual([[true]]);
	});

	test("if the click event is not emitted when the filterPill is clicked and is desabled'", () => {
		const wrapper = mount(FilterPill, {
			localVue,
			propsData: {
				label: 'Idade',
				content: '0 a 120 anos',
				disabled: true,
			}
		});

		expect(wrapper.find('.filter-pill__container').exists()).toBe(true);
		wrapper.find('.filter-pill__container').trigger('click');

		expect(wrapper.emitted().click).toBeFalsy();
	});
});
