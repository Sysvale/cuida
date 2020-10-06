import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Badge from '../../src/components/Badge.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	const wrapper = mount(Badge, {
		localVue,
		propsData: {
			content: 'Test',
		},
	});
	expect(wrapper).toMatchSnapshot();
});

describe("Prop 'variant' tests", () => {
	test("if the computed property changes when the prop variant is setted to 'turquoise'", () => {
		const wrapper = mount(Badge, {
			localVue,
			propsData: {
				variant: 'turquoise',
				content: 'Test',
			},
		});

		expect(wrapper.vm.predefinedStyle).toBe('turquoise');
	});

	test("if the computed property changes when the prop variant is setted to 'green'", () => {
		const wrapper = mount(Badge, {
			localVue,
			propsData: {
				variant: 'green',
				content: 'Test',
			},
		});

		expect(wrapper.vm.predefinedStyle).toBe('green');
	});

	test("if the computed property changes when the prop variant is setted to 'blue'", () => {
		const wrapper = mount(Badge, {
			localVue,
			propsData: {
				variant: 'blue',
				content: 'Test',
			},
		});

		expect(wrapper.vm.predefinedStyle).toBe('blue');
	});

	test("if the computed property changes when the prop variant is setted to 'purple'", () => {
		const wrapper = mount(Badge, {
			localVue,
			propsData: {
				variant: 'purple',
				content: 'Test',
			},
		});

		expect(wrapper.vm.predefinedStyle).toBe('purple');
	});

	test("if the computed property changes when the prop variant is setted to 'pink'", () => {
		const wrapper = mount(Badge, {
			localVue,
			propsData: {
				variant: 'pink',
				content: 'Test',
			},
		});

		expect(wrapper.vm.predefinedStyle).toBe('pink');
	});

	test("if the computed property changes when the prop variant is setted to 'red'", () => {
		const wrapper = mount(Badge, {
			localVue,
			propsData: {
				variant: 'red',
				content: 'Test',
			},
		});

		expect(wrapper.vm.predefinedStyle).toBe('red');
	});

	test("if the computed property changes when the prop variant is setted to 'orange'", () => {
		const wrapper = mount(Badge, {
			localVue,
			propsData: {
				variant: 'orange',
				content: 'Test',
			},
		});

		expect(wrapper.vm.predefinedStyle).toBe('orange');
	});

	test("if the computed property changes when the prop variant is setted to 'yellow'", () => {
		const wrapper = mount(Badge, {
			localVue,
			propsData: {
				variant: 'yellow',
				content: 'Test',
			},
		});

		expect(wrapper.vm.predefinedStyle).toBe('yellow');
	});

	test("if the computed property changes when the prop variant is setted to 'gray'", () => {
		const wrapper = mount(Badge, {
			localVue,
			propsData: {
				variant: 'gray',
				content: 'Test',
			},
		});

		expect(wrapper.vm.predefinedStyle).toBe('gray');
	});
});
