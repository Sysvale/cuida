import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { ComponentMetadata } from '../types/index.js';
import { readSourceFile } from '../readers/source.js';
import { DocsIndex, readDocFile } from '../readers/docs.js';
import { searchComponents } from '../indexer/search.js';

export function getComponentTools() {
	return [
		{
			name: 'list_components',
			description: 'Lists available UI components, with an optional category filter.',
			inputSchema: {
				type: 'object',
				properties: {
					category: {
						type: 'string',
						description: 'The category to filter components by.',
					},
				},
			},
		},
		{
			name: 'get_component_metadata',
			description: 'Gets the full metadata for a specific component.',
			inputSchema: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						description: 'The name of the component (e.g., "CdsButton").',
					},
				},
				required: ['name'],
			},
		},
		{
			name: 'get_component_source',
			description: 'Gets the source code for a specific component.',
			inputSchema: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						description: 'The name of the component (e.g., "CdsButton").',
					},
				},
				required: ['name'],
			},
		},
		{
			name: 'get_component_docs',
			description: 'Gets the documentation for a specific component.',
			inputSchema: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						description: 'The name of the component (e.g., "CdsButton").',
					},
				},
				required: ['name'],
			},
		},
		{
			name: 'search_components',
			description: 'Searches for components by a query string.',
			inputSchema: {
				type: 'object',
				properties: {
					query: {
						type: 'string',
						description: 'The search query.',
					},
				},
				required: ['query'],
			},
		}
	];
}

export async function handleComponentToolCall(
	request: CallToolRequest,
	metadata: Record<string, ComponentMetadata>,
	docsIndex: DocsIndex,
): Promise<CallToolResult> {
	const { name, arguments: args } = request.params;

	switch (name) {
		case 'list_components': {
			const category = args?.category as string | undefined;
			const simplifiedComponents = Object.values(metadata).map((comp) => {
				const componentCategory = comp?.category || 'general';
				return {
					name: comp.displayName,
					description: comp.description || 'No description available.',
					category: componentCategory,
				};
			});
			const filteredComponents = category
				? simplifiedComponents.filter((c) => c.category.toLowerCase() === category.toLowerCase())
				: simplifiedComponents;
			return {
				content: [{ type: 'text', text: JSON.stringify(filteredComponents, null, 2) }],
			};
		}

		case 'get_component_metadata': {
			const componentName = args?.name as string;
			if (!componentName) {
				throw new Error('Component name is required for get_component_metadata.');
			}
			const component = Object.values(metadata).find(c => c.displayName === componentName);
			if (!component) {
				throw new Error(`Component "${componentName}" not found.`);
			}
			return {
				content: [{ type: 'text', text: JSON.stringify(component, null, 2) }],
			};
		}

		case 'get_component_source': {
			const componentName = args?.name as string;
			if (!componentName) {
				throw new Error('Component name is required for get_component_source.');
			}
			const component = Object.values(metadata).find(c => c.displayName === componentName);
			if (!component || !component.sourceFiles[0]) {
				throw new Error(`Source file for component "${componentName}" not found.`);
			}
			const sourceCode = await readSourceFile(component.sourceFiles[0]);
			return {
				content: [{ type: 'text', text: sourceCode }],
			};
		}

		case 'get_component_docs': {
			const componentName = args?.name as string;
			if (!componentName) {
				throw new Error('Component name is required for get_component_docs.');
			}

			const docName = componentName.startsWith('Cds') ? componentName.substring(3) : componentName;
			const docPath = docsIndex.get(docName.toLowerCase());
			if (!docPath) {
				throw new Error(`Documentation for component "${componentName}" not found.`);
			}

			const docContent = await readDocFile(docPath);
 
			return {
				content: [{ type: 'text', text: docContent }],
			};
		}
		
		case 'search_components': {
			const query = args?.query as string;
			if (!query) {
				throw new Error('Query is required for search_components.');
			}
			const searchResults = searchComponents(query, metadata);
			return {
				content: [{ type: 'text', text: JSON.stringify(searchResults, null, 2) }],
			};
		}

		default:
			throw new Error(`The tool "${name}" is not a known component tool.`);
	}
}
