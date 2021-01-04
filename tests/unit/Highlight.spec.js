import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Highlight from '../../src/components/Highlight.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(Highlight, {
		localVue,
	});

	expect(wrapper).toMatchSnapshot();
});

describe("Styles based on the variants tests", () => {
	test("if the the styles are applied properly when the variant is 'info'", () => {
		const wrapper = mount(Highlight, {
			localVue,
			propsData: {
				variant: 'info',
			},
		});

		expect(wrapper.findAll('.highlight__container--info').length).toBe(1);
	});

	test("if the the styles are applied properly when the variant is 'success'", () => {
		const wrapper = mount(Highlight, {
			localVue,
			propsData: {
				variant: 'success',
			},
		});

		expect(wrapper.findAll('.highlight__container--success').length).toBe(1);
	});

	test("if the the styles are applied properly when the variant is 'danger'", () => {
		const wrapper = mount(Highlight, {
			localVue,
			propsData: {
				variant: 'danger',
			},
		});

		expect(wrapper.findAll('.highlight__container--danger').length).toBe(1);
	});
});

test("if the the styles are applied properly when the highlight is animated", () => {
	const wrapper = mount(Highlight, {
		localVue,
		propsData: {
			animated: true,
		},
	});

	expect(wrapper.findAll('.highlight__container--highlighted').length).toBe(1);
});
