import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Popover from '../../src/components/Popover.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	const wrapper = mount(Popover, {
		localVue,
		propsData: {
			target: 'trigger-popover',
			value: false,
		},
	});

	expect(wrapper).toMatchSnapshot();
});

describe("Items styles test", () => {
	let App;
	beforeEach(() => {
		App = localVue.component('App', {
			components: { Popover },
			props: {
				alignment: {
					type: String,
					default: 'left',
				},
				value: {
					type: Boolean,
					default: false,
				},
			},
			template: `
				<div>
					<button id="trigger-popover"> Click </button>
					<popover
						v-model="value"
						target="trigger-popover"
						size="lg"
						:alignment="alignment"
					/>
				</div>
			`,
		});
	});

	it('if component is left aligned internalOffset must be negative', () => {
		const wrapper = mount(App, {
			localVue,
			propsData: {
				alignment: 'left',
				value: true,
			},
			attachTo: document.body,
		});
		const offset = wrapper.findComponent(Popover).vm.internalOffset;
		const offsetNegative = offset < 0;
		expect(offsetNegative).toBe(true);
	});
	
	it('if component is right aligned internalOffset must be positive', () => {
		const wrapper = mount(App, {
			localVue,
			propsData: {
				alignment: 'right',
				value: true,
			},
			attachTo: document.body,
		});
		const offset = wrapper.findComponent(Popover).vm.internalOffset;
		const offsetNegative = offset < 0;
		expect(offsetNegative).toBe(false);
	});
});
