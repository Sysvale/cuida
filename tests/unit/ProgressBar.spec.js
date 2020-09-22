import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import ProgressBar from '../../src/components/ProgressBar.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	const wrapper = mount(ProgressBar, {
		localVue,
		propsData: {
			percentage: 0.67,
		}
	});

	expect(wrapper).toMatchSnapshot();
});

describe("Colors are applied properly", () => {
	test("If the progress-bar color is the same that was passed via prop", () => {
		const color = '#23B1C7';
		
		const wrapper = mount(ProgressBar, {
			localVue,
			propsData: {
				color,
				percentage: 0.67,
			}
		});

		expect(wrapper.vm.progressIndicatorStyle['--color']).toBe(color);
	});

	test("If the background of the progress-bar is the same that was passed via prop", () => {
		const backgroundColor = '#000000';
		
		const wrapper = mount(ProgressBar, {
			localVue,
			propsData: {
				backgroundColor,
				percentage: 0.67,
			}
		});

		expect(wrapper.vm.backgroundColorStyle['--backgroundColor']).toBe(backgroundColor);
	});
});

test("If the size of the progress-bar changes properly", () => {
	const wrapper = mount(ProgressBar, {
		localVue,
		propsData: {
			percentage: 0.67,
		}
	});

	expect(wrapper.vm.progressIndicatorStyle['--width']).toBe("67%");
});

test("If the text is shown properly", () => {
	const wrapper = mount(ProgressBar, {
		localVue,
		propsData: {
			percentage: 0.53,
			showText: true,
		}
	});

	expect(wrapper.findAll('.text-style').length).toBe(1);
});
