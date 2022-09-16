import { mount, createLocalVue } from '@vue/test-utils';
import Card from '../../src/components/Card.vue';

const localVue = createLocalVue();

test('Component is mounted properly', () => {
	const wrapper = mount(Card, {
		localVue,
		propsData: {
			title: 'Card title',
			description: 'Card description',
			showAction: true,
			action: 'See more',
		}
	});
	expect(wrapper).toMatchSnapshot();
});