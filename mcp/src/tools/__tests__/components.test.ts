import { describe, it, expect, vi } from 'vitest';
import { handleComponentToolCall } from '../components.js';
import { CallToolRequest } from '@modelcontextprotocol/sdk/types.js';
import { ComponentMetadata } from '../../types/index.js';

vi.mock('../../readers/source.js', () => ({
	readSourceFile: vi.fn().mockResolvedValue('<template>...source code...</template>'),
}));

vi.mock('../../readers/docs.js', () => ({
	readDocFile: vi.fn().mockResolvedValue('# Hello World'),
	indexDocs: vi.fn(),
}));

const mockMetadata: Record<string, ComponentMetadata> = {
	CdsButton: {
		displayName: 'CdsButton',
		exportName: 'default',
		description: 'A button component.',
		props: [{ name: 'variant', type: { name: 'string' }, required: false, description: '' , defaultValue: { func: false, value: "'green'" } }],
		events: [],
		slots: [],
		tags: {},
		sourceFiles: ['src/components/Button.vue'],
	},
	CdsBaseInput: {
		displayName: 'CdsBaseInput',
		exportName: 'default',
		description: 'An input for text, email, etc.',
		props: [{ name: 'type', type: { name: 'string' }, required: false, description: 'Can be email' , defaultValue: { func: false, value: "'text'" } }],
		events: [],
		slots: [],
		tags: {},
		sourceFiles: ['src/components/BaseInput.vue'],
	},
};

const mockDocsIndex = new Map([
	['button', '/fake/path/to/button.html']
]);

describe('Component Tools', () => {
	describe('search_components', () => {
		it('should return components matching the query', async () => {
			const request: Partial<CallToolRequest> = {
				params: { name: 'search_components', arguments: { query: 'email' } },
			};
			const result = await handleComponentToolCall(request as CallToolRequest, mockMetadata, mockDocsIndex);
			if (result.content[0].type === 'text') {
				const data = JSON.parse(result.content[0].text as string);
				expect(data).toEqual(
					expect.arrayContaining([
						expect.objectContaining({ name: 'CdsBaseInput' })
					])
				);
				expect(data[0].relevance).toBeGreaterThan(0);
			} else {
				throw new Error('Expected text content');
			}
		});

		it('should return an empty array for no matches', async () => {
			const request: Partial<CallToolRequest> = {
				params: { name: 'search_components', arguments: { query: 'nonexistent' } },
			};
			const result = await handleComponentToolCall(request as CallToolRequest, mockMetadata, mockDocsIndex);
			if (result.content[0].type === 'text') {
				const data = JSON.parse(result.content[0].text as string);
				expect(data).toEqual([]);
			} else {
				throw new Error('Expected text content');
			}
		});
	});

	describe('get_component_metadata', () => {
		it('should return the full metadata for a component', async () => {
			const request: Partial<CallToolRequest> = {
				params: { name: 'get_component_metadata', arguments: { name: 'CdsButton' } },
			};
			const result = await handleComponentToolCall(request as CallToolRequest, mockMetadata, mockDocsIndex);
			if (result.content[0].type === 'text') {
				const data: ComponentMetadata = JSON.parse(result.content[0].text as string);
				expect(data.displayName).toBe('CdsButton');
				expect(data.props[0].name).toBe('variant');
			} else {
				throw new Error('Expected text content');
			}
		});

		it('should throw an error if the component is not found', async () => {
			const request: Partial<CallToolRequest> = {
				params: { name: 'get_component_metadata', arguments: { name: 'NonExistent' } },
			};
			await expect(handleComponentToolCall(request as CallToolRequest, mockMetadata, mockDocsIndex))
				.rejects.toThrow('Component "NonExistent" not found.');
		});
	});
});
