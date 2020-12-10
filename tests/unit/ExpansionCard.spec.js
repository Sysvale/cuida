import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import ExpansionCard from '../../src/components/ExpansionCard.vue';

const localVue = createLocalVue();

// test('Component is mounted properly', () => {
// 	const wrapper = mount(ExpansionCard, {
// 		localVue,
// 		propsData: {
// 			title: '',
// 		},
// 	});

// 	expect(wrapper).toMatchSnapshot();
// });

describe('Hover tests', () => {
	test("if hover style is applied when the card is hovered", async () => {
		const wrapper = shallowMount(ExpansionCard, {
			localVue,
			propsData: {
				//
			},
		});

		expect(wrapper.find('.expansion-card__container').exists()).toBe(true);

		wrapper.trigger('mouseover');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.expansion-card__container--hover').exists()).toBe(true);
		expect(wrapper.find('.expansion-card__expand-icon').exists()).toBe(true);

		wrapper.trigger('mouseleave');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.expansion-card__container--hover').exists()).toBe(false);
		expect(wrapper.find('.expansion-card__expand-icon').exists()).toBe(false);
	});
});

describe('Click tests', () => {
	test("if the card is expanded and an event is emitted when the card is clicked", async () => {
		const wrapper = shallowMount(ExpansionCard, {
			localVue,
			propsData: {
				//
			},
		});

		expect(wrapper.find('.expansion-card__container').exists()).toBe(true);

		wrapper.trigger('click');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.expansion-card__container--expanded').exists()).toBe(true);
		expect(wrapper.find('.expansion-card__contract-icon').exists()).toBe(true);

		expect(wrapper.emitted().expanded).toBeTruthy();
		expect(wrapper.emitted().expanded).toEqual([[true]]);
	});

	test("if the card is contracted and an event is emitted when the contract icon is clicked", async () => {
		const wrapper = shallowMount(ExpansionCard, {
			localVue,
			propsData: {
				//
			},
		});

		expect(wrapper.find('.expansion-card__container').exists()).toBe(true);
		wrapper.trigger('click');
		await wrapper.vm.$nextTick();

		wrapper.find('.expansion-card__contract-icon').trigger('click');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.expansion-card__container--expanded').exists()).toBe(false);
		expect(wrapper.find('.expansion-card__contract-icon').exists()).toBe(false);

		expect(wrapper.emitted().expanded).toBeTruthy();
		expect(wrapper.emitted().expanded).toEqual([[true], [false]]);
	});
});
