import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Scrollable from '../../src/components/Scrollable.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Check is the component is getting height and width', () => {
    test('Component is mounted properly', () => {
        const wrapper = mount(Scrollable, {
            localVue,
            propsData: {
                maxHeight: '200px',
                maxWidth: '300px',
            },
        });
        expect(wrapper).toMatchSnapshot();
    });
});
