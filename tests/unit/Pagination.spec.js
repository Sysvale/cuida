import { mount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Pagination from '../../src/components/Pagination.vue';

const localVue = createLocalVue();

describe('Pagination', () => {
	test('component renders correctly', async () => {
		const wrapper = mount(Pagination, {
			localVue,
			propsData: {
				total: 20,
				perPage: 5,
			},
		});

		await flushPromises();

		expect(wrapper).toMatchSnapshot();
	});

	test('component shows the number of pages correctly', async () => {
		expect.assertions(2);
		const wrapper = mount(Pagination, {
			localVue,
			propsData: {
				total: 20,
				perPage: 3,
			},
		});

		await flushPromises();

		expect(wrapper.vm.pages).toHaveLength(9);
		expect(/<<\s*<\s*1\s*2\s*3\s*4\s*5\s*>\s*>>/.test(wrapper.text())).toBeTruthy();
	});

	test('input events are emitted correctly', async () => {
		expect.assertions(5);
		const wrapper = mount(Pagination, {
			localVue,
			propsData: {
				total: 20,
				perPage: 3,
			},
		});

		await flushPromises();

		await wrapper.vm.handlePageClick(wrapper.vm.pages[3]);

		expect(wrapper.emitted('input')[0]).toContainEqual(2);

		await wrapper.vm.handlePageClick(wrapper.vm.pages[7]);

		expect(wrapper.emitted('input')[1]).toContainEqual(3);

		await wrapper.vm.handlePageClick(wrapper.vm.pages[8]);

		expect(wrapper.emitted('input')[2]).toContainEqual(7);

		await wrapper.vm.handlePageClick(wrapper.vm.pages[1]);

		expect(wrapper.emitted('input')[3]).toContainEqual(6);

		await wrapper.vm.handlePageClick(wrapper.vm.pages[0]);

		expect(wrapper.emitted('input')[4]).toContainEqual(1);
	});
});
