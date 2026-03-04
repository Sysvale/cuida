import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { ComponentMetadata } from '../types/index.js';
import { readSourceFile } from '../readers/source.js';
import { readDocFile } from '../readers/docs.js';
import { searchComponents } from '../indexer/search.js';
import { logger } from '../utils/logger.js';

const errorMessageBuilder = (message: string): CallToolResult => ({ content: [{ type: 'text', text: message }] });

const getFirstComponent = (query: string, metadata: Record<string, ComponentMetadata>): ComponentMetadata | any => {
	const [ component ] = searchComponents(query, metadata);
	if(!component) {
		return errorMessageBuilder(`Component "${query}" not found.`);
	}
	return component;
}
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
): Promise<CallToolResult> {
	try {
		if (!request.params.arguments) {
			throw new Error('No tool arguments provided.')
		}

		const { name, arguments: args } = request.params;

		switch (name) {
			case 'list_components': {
				const category = args?.category as string | undefined;

				const simplifiedComponents = Object.values(metadata).map((component) => ({
					name: component.displayName,
					description: component.description || 'No description available.',
					category: component?.category || 'general',
				})).filter(
					(mappedComponent) => category ? mappedComponent.category.toLowerCase() === category.toLowerCase() : true
				);

				return {
					content: [{ type: 'text', text: JSON.stringify(simplifiedComponents, null, 2) }],
				};
			}

			case 'get_component_metadata': {
				const componentName = args?.name as string;
				if (!componentName) {
					return errorMessageBuilder('Component name is required for get_component_metadata.');
				}
				const component = getFirstComponent(componentName, metadata);
				return {
					content: [{ type: 'text', text: JSON.stringify(component, null, 2) }],
				};
			}

			case 'get_component_source': {
				const componentName = args?.name as string;
				if (!componentName) {
					return errorMessageBuilder('Component name is required for get_component_source.');
				}

				const { sourceFiles } = getFirstComponent(componentName, metadata);
				if (!sourceFiles[0]) {
					return errorMessageBuilder(`Source file for component "${componentName}" not found.`);
				}
				const sourceCode = await readSourceFile(sourceFiles[0]);
				return {
					content: [{ type: 'text', text: sourceCode }],
				};
			}

			case 'get_component_docs': {
				const componentName = args?.name as string;
				if (!componentName) {
					return errorMessageBuilder('Component name is required for get_component_docs.');
				}

				const { builtDocPath } = getFirstComponent(componentName, metadata);

				logger.debug('get_component_docs result', { builtDocPath });

				if (!builtDocPath) {
					return errorMessageBuilder(`Documentation for component "${componentName}" not found.`);
				}

				const docContent = await readDocFile(builtDocPath);

				logger.debug('get_component_docs dochPath', { docContent });
	
				return {
					content: [{ type: 'text', text: docContent }],
				};
			}
			
			case 'search_components': {
				const query = args?.query as string;
				if (!query) {
					return errorMessageBuilder('Query is required for search_components.');
				}
				const searchResults = searchComponents(query, metadata);
				return {
					content: [{ type: 'text', text: JSON.stringify(searchResults, null, 2) }],
				};
			}
			default:
				throw new Error(`The tool "${name}" is not a known component tool.`);
		}

	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		return {
			content: [
				{
					type: 'text',
					text: `Error: ${errorMessage}`,
				},
			],
			isError: true,
		}
	}
}
