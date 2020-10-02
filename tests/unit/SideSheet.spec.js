import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue, { BButton } from 'bootstrap-vue';
import SideSheet from '../../src/components/SideSheet.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	const wrapper = mount(SideSheet, {
		localVue,
		propsData: {
			value: true,
			right: true,
		},
	});
	expect(wrapper).toMatchSnapshot();
});

describe("Items styles test", () => {
	test('if content is left aligned', () => {
		const wrapper = mount(SideSheet, {
			localVue,
			propsData: {
				value: true,
				left: true,
			},
		});
		expect(wrapper.findAll('.left').length).toBe(1);
	});

	test('if content is right aligned', () => {
		const wrapper = mount(SideSheet, {
			localVue,
			propsData: {
				value: true,
				right: true,
			},
		});
		expect(wrapper.findAll('.right').length).toBe(1);
	});
});

describe("Behavior tests", () => {

	test('if noCloseOnBackdrop as true works', async (done) => {
		const wrapper = mount(SideSheet, {
			localVue,
			propsData: {
				value: true,
				right: true,
				noCloseOnBackdrop: true,
			},
		});

		const overlay = wrapper.find('.overlay');
		overlay.trigger('click');
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().input).toBeFalsy();
		done();
	});

	test('if noCloseOnEsc as true works', async () => {
		const wrapper = mount(SideSheet, {
			localVue,
			propsData: {
				value: true,
				right: true,
				noCloseOnEsc: true,
			},
		});

		wrapper.trigger('keyup', {
			keyCode: 27
		});

		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().input).toBeFalsy();
	});
});
