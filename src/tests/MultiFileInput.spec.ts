// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import MultiFileInput from '../components/MultiFileInput.vue';
import { mount } from '@vue/test-utils';

describe('MultiFileInput snapshot test', () => {
	test('renders correctly', () => {
		const wrapper = mount(MultiFileInput, {
			props: {
				documents:[
					{
						name: 'Comprovante de residência',
						required: true,
					},
					{
						name: 'Guia de encaminhamento',
						required: false,
					},
					{
						name: 'RG',
						required: false,
					},
					{
						name: 'Passaporte',
						required: true,
					}
				],
				variant: 'green',
				buttonSecondary: false,
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
