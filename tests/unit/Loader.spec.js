import { shallowMount, createLocalVue } from '@vue/test-utils';
import Loader from '../../src/components/Loader.vue';

const localVue = createLocalVue();
const imageBackground = 'https://sysvale.github.io/cuida/static/media/CuidaTempLogo.f4adb1cc.png';

test('Component is mounted properly', () => {
	const wrapper = shallowMount(Loader, {
		localVue,
    propsData: {
      imageBackground,
    }
	});
	expect(wrapper).toMatchSnapshot();
});
