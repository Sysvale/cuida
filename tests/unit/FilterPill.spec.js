import { shallowMount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import FilterPill from '../../src/components/FilterPill.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	const wrapper = shallowMount(FilterPill, {
		localVue,
		propsData: {
			label: 'Idade',
			content: '0 a 120 anos',
		},
		stubs: {
			'ion-icon': true,
		},
	});

	expect(wrapper).toMatchSnapshot();
});

describe('Click tests', () => {
	test("if the click event is emitted properly when the filterPill is clicked'", () => {
		const wrapper = shallowMount(FilterPill, {
			localVue,
			propsData: {
				label: 'Idade',
				content: '0 a 120 anos',
			},
			stubs: {
				'ion-icon': true,
			},
		});

		expect(wrapper.find('.filter-pill__container').exists()).toBe(true);
		wrapper.find('.filter-pill__container').trigger('click');

		expect(wrapper.emitted().click).toBeTruthy();
		expect(wrapper.emitted().click).toEqual([[true]]);
	});

	test("if the click event is not emitted when the filterPill is clicked and is desabled'", () => {
		const wrapper = shallowMount(FilterPill, {
			localVue,
			propsData: {
				label: 'Idade',
				content: '0 a 120 anos',
				disabled: true,
			},
			stubs: {
				'ion-icon': true,
			},
		});

		expect(wrapper.find('.filter-pill__container').exists()).toBe(true);
		wrapper.find('.filter-pill__container').trigger('click');

		expect(wrapper.emitted().click).toBeFalsy();
	});
});
