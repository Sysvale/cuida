import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import AlertCard from '../../src/components/AlertCard.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(AlertCard, {
		localVue,
		propsData: {
			title: '',
		},
	});

	expect(wrapper).toMatchSnapshot();
});

describe('Click tests', () => {
	test('if an event is emited when the checkbox is clicked', () => {
		const wrapper = shallowMount(AlertCard, {
			localVue,
			propsData: {
				withIcon: true,
				variant: 'danger',
				title: 'Test',
				selectable: true,
			},
		});

		expect(wrapper.find('#custom-checkbox').exists()).toBe(true);
		wrapper.find('#custom-checkbox').trigger('click');

		expect(wrapper.emitted().input).toBeTruthy();
		expect(wrapper.emitted().input).toEqual([[true]]);
	});

	test('if an event is emited when the card is clicked', () => {
		const wrapper = shallowMount(AlertCard, {
			localVue,
			propsData: {
				withIcon: true,
				variant: 'danger',
				title: 'Test',
				selectable: true,
			},
		});

		expect(wrapper.find('.alert-card__container').exists()).toBe(true);
		wrapper.find('.alert-card__container').trigger('click');

		expect(wrapper.emitted().input).toBeTruthy();
		expect(wrapper.emitted().input).toEqual([[true]]);
	});

	test('if an event is not emited when the card is clicked when muted', () => {
		const wrapper = shallowMount(AlertCard, {
			localVue,
			propsData: {
				withIcon: true,
				variant: 'danger',
				title: 'Test',
				selectable: true,
				muted: true,
			},
		});

		expect(wrapper.find('.alert-card__container').exists()).toBe(true);
		wrapper.find('.alert-card__container').trigger('click');

		expect(wrapper.emitted().input).toBeFalsy();
	});
});

describe('Styles based on the variants tests', () => {
	test("if the the styles are applied properly when the variant is 'info'", async () => {
		const wrapper = mount(AlertCard, {
			localVue,
			propsData: {
				withIcon: true,
				variant: 'info',
				title: 'Test',
				selectable: true,
			},
		});

		expect(wrapper.findAll('.alert-card__title--info').length).toBe(1);
		expect(wrapper.findAll('.icon__container--info').length).toBe(1);
		expect(wrapper.findAll('.icon--info').length).toBe(1);

		expect(wrapper.findAll('.alert-card__container--selected-info').length).toBe(0);

		wrapper.find('#custom-checkbox').trigger('click');

		await flushPromises();

		expect(wrapper.findAll('.alert-card__container--selected-info').length).toBe(1);
	});

	test("if the the styles are applied properly when the variant is 'warning'", async () => {
		const wrapper = mount(AlertCard, {
			localVue,
			propsData: {
				withIcon: true,
				variant: 'warning',
				title: 'Test',
				selectable: true,
			},
		});

		expect(wrapper.findAll('.alert-card__title--warning').length).toBe(1);
		expect(wrapper.findAll('.icon__container--warning').length).toBe(1);
		expect(wrapper.findAll('.icon--warning').length).toBe(1);

		expect(wrapper.findAll('.alert-card__container--selected-warning').length).toBe(0);

		wrapper.find('#custom-checkbox').trigger('click');

		await flushPromises();

		expect(wrapper.findAll('.alert-card__container--selected-warning').length).toBe(1);
	});

	test("if the the styles are applied properly when the variant is 'danger'", async () => {
		const wrapper = mount(AlertCard, {
			localVue,
			propsData: {
				withIcon: true,
				variant: 'danger',
				title: 'Test',
				selectable: true,
			},
		});

		expect(wrapper.findAll('.alert-card__title--danger').length).toBe(1);
		expect(wrapper.findAll('.icon__container--danger').length).toBe(1);
		expect(wrapper.findAll('.icon--danger').length).toBe(1);

		expect(wrapper.findAll('.alert-card__container--selected-danger').length).toBe(0);

		wrapper.find('#custom-checkbox').trigger('click');

		await flushPromises();

		expect(wrapper.findAll('.alert-card__container--selected-danger').length).toBe(1);
	});
});

test("if the the styles are applied properly when the variant is 'danger'", () => {
	const wrapper = mount(AlertCard, {
		localVue,
		propsData: {
			withIcon: true,
			variant: 'danger',
			title: 'Test',
			selectable: true,
			muted: true,
		},
	});

	expect(wrapper.findAll('.alert-card__container--muted').length).toBe(1);
});
