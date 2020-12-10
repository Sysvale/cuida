import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import ExpansionCard from '../../src/components/ExpansionCard.vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

test('Component is mounted properly', () => {
	const wrapper = mount(ExpansionCard, {
		localVue,
		propsData: {
			icon: 'house-fill',
			mainValue: 32,
			legend: 'UBSs com dados atualizados',
			variant: 'blue',
		},
	});

	expect(wrapper).toMatchSnapshot();
});

describe('Hover tests', () => {
	test("if hover style is applied when the card is hovered", async () => {
		const wrapper = shallowMount(ExpansionCard, {
			localVue,
		});

		expect(wrapper.find('.expansion-card').exists()).toBe(true);

		wrapper.trigger('mouseover');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.expansion-card--hover').exists()).toBe(true);
		expect(wrapper.find('.expansion-card__expand-icon').exists()).toBe(true);

		wrapper.trigger('mouseleave');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.expansion-card--hover').exists()).toBe(false);
		expect(wrapper.find('.expansion-card__expand-icon').exists()).toBe(false);
	});
});

describe('Click tests', () => {
	test("if the card is expanded and an event is emitted when the card is clicked", async () => {
		const wrapper = shallowMount(ExpansionCard, {
			localVue,
		});

		expect(wrapper.find('.expansion-card').exists()).toBe(true);

		wrapper.trigger('mouseover');
		wrapper.trigger('click');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.expansion-card--expanded').exists()).toBe(true);
		expect(wrapper.find('.expansion-card__contract-icon').exists()).toBe(true);

		expect(wrapper.emitted().expanded).toBeTruthy();
		expect(wrapper.emitted().expanded).toEqual([[true]]);
	});

	test("if the card is contracted and an event is emitted when the expand icon is clicked", async () => {
		const wrapper = shallowMount(ExpansionCard, {
			localVue,
		});

		expect(wrapper.find('.expansion-card').exists()).toBe(true);
		wrapper.trigger('mouseover');
		await wrapper.vm.$nextTick();

		wrapper.find('.expansion-card__expand-icon').trigger('click');
		await wrapper.vm.$nextTick();

		expect(wrapper.find('.expansion-card--expanded').exists()).toBe(true);
		expect(wrapper.find('.expansion-card__contract-icon').exists()).toBe(true);

		expect(wrapper.emitted().expanded).toBeTruthy();
		expect(wrapper.emitted().expanded).toEqual([[true]]);
	});

	test("if the card is contracted and an event is emitted when the contract icon is clicked", async () => {
		const wrapper = shallowMount(ExpansionCard, {
			localVue,
		});

		expect(wrapper.find('.expansion-card').exists()).toBe(true);
		wrapper.trigger('mouseover');
		wrapper.trigger('click');
		await wrapper.vm.$nextTick();

		wrapper.find('.expansion-card__contract-icon').trigger('click');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.expansion-card--expanded').exists()).toBe(false);
		expect(wrapper.find('.expansion-card__contract-icon').exists()).toBe(false);

		expect(wrapper.emitted().expanded).toBeTruthy();
		expect(wrapper.emitted().expanded).toEqual([[true], [false]]);
	});
});

describe("Prop 'variant' tests", () => {
	const variantStyles = {
		turquoise: 'expansion-card--turquoise',
		green: 'expansion-card--green',
		blue: 'expansion-card--blue',
		purple: 'expansion-card--purple',
		pink: 'expansion-card--pink',
		red: 'expansion-card--red',
		orange: 'expansion-card--orange',
		yellow: 'expansion-card--yellow',
		gray: 'expansion-card--gray',
	};
	const variants = Object.keys(variantStyles);

	variants.forEach(variant => {
		let expectedStyle = variantStyles[variant];

		test(`if the computed property changes when the prop variant is set to '${variant}'`, () => {
			let wrapper = mount(ExpansionCard, {
				localVue,
				propsData: {
					variant,
				},
			});
	
			expect(wrapper.find('.expansion-card').exists()).toBe(true);
			
			expect(wrapper.vm.variantStyle).toBe(expectedStyle);
		});
	});
});
