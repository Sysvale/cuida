import { describe, test, expect } from 'vitest';
import FileViewer from '../components/FileViewer.vue';
import { mount } from '@vue/test-utils';

describe('FileViewer', () => {
	test('renders correctly', async () => {
		const wrapper = mount(FileViewer, {
			props: {
				label: 'Comprovante de residência',
				fileUrl: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
				variant: 'green',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
