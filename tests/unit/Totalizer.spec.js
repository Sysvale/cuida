import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Totalizer from '../../src/components/Totalizer.vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

test('Component is mounted properly', () => {
	const wrapper = mount(Totalizer, {
		localVue,
		propsData: {
			iconSide: 'left',
			variant: 'blue',
		},
	});

	expect(wrapper).toMatchSnapshot();
});

describe("Prop 'variant' tests", () => {
	const variantStyles = {
		turquoise: '.totalizer__icon--turquoise',
		green: '.totalizer__icon--green',
		blue: '.totalizer__icon--blue',
		purple: '.totalizer__icon--purple',
		pink: '.totalizer__icon--pink',
		red: '.totalizer__icon--red',
		orange: '.totalizer__icon--orange',
		yellow: '.totalizer__icon--yellow',
		gray: '.totalizer__icon--gray',
	};

	const variants = Object.keys(variantStyles);

	variants.forEach(variant => {
		let expectedStyle = variantStyles[variant];

		test(`if the icon style changes when the prop variant is set to '${variant}'`, () => {
			let wrapper = mount(Totalizer, {
				localVue,
				slots: {
					icon: '<b-icon-house-fill />',
					value: '<div> 1589 </div>',
					subtitle: '<div> Agendamentos realizados </div>'
				},
				propsData: {
					variant,
				},
			});
	
			expect(wrapper.find(expectedStyle).exists()).toBe(true);
		});
	});
});

describe("Prop 'variant' tests", () => {
	const iconSideClasses = {
		right: '.totalizer__icon--right',
		left: '.totalizer__icon--left',
	};

	const position = Object.keys(iconSideClasses);

	position.forEach(position => {
		let expectedStyle = iconSideClasses[position];

		test(`if the icon style changes when the prop iconSide is set to '${position}'`, () => {
			let wrapper = mount(Totalizer, {
				localVue,
				slots: {
					icon: '<b-icon-house-fill />',
					value: '<div> 1589 </div>',
					subtitle: '<div> Agendamentos realizados </div>'
				},
				propsData: {
					iconSide: position,
				},
			});
	
			expect(wrapper.find(expectedStyle).exists()).toBe(true);
		});
	});
});
