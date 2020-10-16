import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import StepperCounter from '../../src/components/StepperCounter.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test('Component is mounted properly', () => {
	let mocked_data = [
		{ label: 'Dummy label 1', concluded: true, active: false },
		{ label: 'Dummy label 3', concluded: false, active: true },
		{ label: 'Dummy label 2', concluded: false, active: false },
	];

	const wrapper = mount(StepperCounter, {
		localVue,
		propsData: {
			steps: mocked_data,
		},
	});
	expect(wrapper).toMatchSnapshot();
});

describe("Divider styles test", () => {
	test('if all the stepper dividers are rendered as common dividers', () => {
		let mocked_data = [
			{ label: 'Dummy label 1', concluded: false, active: true },
			{ label: 'Dummy label 2', concluded: false, active: false },
			{ label: 'Dummy label 3', concluded: false, active: false },
		];

		const wrapper = mount(StepperCounter, {
			localVue,
			propsData: {
				steps: mocked_data,
			},
		});
		expect(wrapper.findAll('.common-stepper-divider').length).toBe(2);
	});

	test('if one of the stepper divider is rendered as an in_progress divider and others are rendered as common dividers', () => {
		let mocked_data = [
			{ label: 'Dummy label 1', concluded: true, active: false },
			{ label: 'Dummy label 2', concluded: false, active: true },
			{ label: 'Dummy label 3', concluded: false, active: false },
		];

		const wrapper = mount(StepperCounter, {
			localVue,
			propsData: {
				steps: mocked_data,
			},
		});
		expect(wrapper.findAll('.in-progress-stepper-divider').length).toBe(1);
		expect(wrapper.findAll('.common-stepper-divider').length).toBe(1);
	});

	test('if one of the stepper divider is rendered as a concluded divider and the other is rendered as an in_progress divider', () => {
		let mocked_data = [
			{ label: 'Dummy label 1', concluded: true, active: false },
			{ label: 'Dummy label 2', concluded: true, active: false },
			{ label: 'Dummy label 3', concluded: false, active: true },
		];

		const wrapper = mount(StepperCounter, {
			localVue,
			propsData: {
				steps: mocked_data,
			},
		});
		expect(wrapper.findAll('.concluded-stepper-divider').length).toBe(1);
		expect(wrapper.findAll('.in-progress-stepper-divider').length).toBe(1);
	});
});

describe("Change step event tests", () => {
	test('if a event is emited when the stepper is clicked', () => {
		let mocked_data = [
			{ label: 'Dummy label 1', concluded: false, active: true },
			{ label: 'Dummy label 2', concluded: false, active: false },
			{ label: 'Dummy label 3', concluded: false, active: false },
		];

		const wrapper = mount(StepperCounter, {
			localVue,
			propsData: {
				steps: mocked_data,
			},
		});

		wrapper.find('#step-2').trigger('click');

		expect(wrapper.emitted().step_changed).toBeTruthy();
		expect(wrapper.emitted().step_changed).toEqual([
			[
				1,
				{"active": true, "concluded": false, "label": "Dummy label 2"},
			]
		]);
	});
});
