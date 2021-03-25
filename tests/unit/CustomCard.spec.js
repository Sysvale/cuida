import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import { CustomCard } from '../../src/components';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

test('Component is mounted properly', () => {
	const wrapper = mount(CustomCard, {
		localVue,
		propsData: {
			title: 'Redes',
			subtitle: 'Habilite as redes da regulação',
		},
	});

	expect(wrapper).toMatchSnapshot();
});
