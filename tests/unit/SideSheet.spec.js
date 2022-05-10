import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue, { BButton } from 'bootstrap-vue';
import SideSheet from '../../src/components/SideSheet.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	const wrapper = mount(SideSheet, {
		localVue,
		propsData: {
			value: true,
			position: 'right',
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
				position: 'left',
			},
		});
		expect(wrapper.findAll('.side-sheet__container--left').length).toBe(1);
	});

	test('if content is right aligned', () => {
		const wrapper = mount(SideSheet, {
			localVue,
			propsData: {
				value: true,
				position: 'right',
			},
		});
		expect(wrapper.findAll('.side-sheet__container--right').length).toBe(1);
  });

  test('if content is right aligned by default', () => {
    const wrapper = mount(SideSheet, {
      localVue,
      propsData: {
        value: true,
      },
    });
    expect(wrapper.findAll('.side-sheet__container--right').length).toBe(1);
  });
});

describe("Behavior tests", () => {

	test('if noCloseOnBackdrop as true works', async (done) => {
		const wrapper = mount(SideSheet, {
			localVue,
			propsData: {
				value: true,
				position: 'right',
				noCloseOnBackdrop: true,
			},
		});

		const overlay = wrapper.find('.side-sheet__overlay');
		overlay.trigger('click');
		await flushPromises();

		expect(wrapper.emitted().input).toBeFalsy();
		done();
	});

	test('if noCloseOnEsc as true works', async () => {
		const wrapper = mount(SideSheet, {
			localVue,
			propsData: {
				value: true,
				position: 'right',
				noCloseOnEsc: true,
			},
		});

		wrapper.trigger('keyup', {
			keyCode: 27
		});

		await flushPromises();

		expect(wrapper.emitted().input).toBeFalsy();
	});
});
