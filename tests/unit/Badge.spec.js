import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Badge from '../../src/components/Badge.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	const wrapper = mount(Badge, {
		localVue,
		slots: {
			default: 'Conteúdo',
		},
	});
	expect(wrapper).toMatchSnapshot();
});

describe('Prop variant tests', () => {
	const wrapper = mount(Badge, {
		localVue,
		slots: {
			default: 'Conteúdo',
		},
	});

	wrapper.vm.predefinedColors.forEach((color) => {
		test(`if the computed property changes when the prop variant is setted to '${color}'`, async () => {
			await wrapper.setProps({ variant: color });
			expect(wrapper.vm.predefinedStyle).toBe(`badge--${color}`);
		});
	});
});
