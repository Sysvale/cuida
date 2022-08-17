import { describe, test, expect } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import Badge from '../components/Badge.vue';
import { mount } from '@vue/test-utils';

describe('Badge', () => {
    test('renders correctly', async () => {
        const wrapper = mount(Badge, {
            variant: 'gray',
        });

        await flushPromises();

        expect(wrapper).toMatchSnapshot();
    });
});
