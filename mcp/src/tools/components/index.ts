import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { ComponentMetadata } from '../../types/index.js';
import { BaseTool, createToolCallHandler } from '../core/handler.js';
import {
	ListComponentsHandler,
	GetComponentMetadataHandler,
	GetComponentSourceHandler,
	GetComponentDocsHandler,
	SearchComponentsHandler,
} from './handlers/index.js';
import { getToolsFromHandlers } from '../core/utils.js';

const handlers: Record<string, BaseTool> = {
	list_components: new ListComponentsHandler(),
	get_component_metadata: new GetComponentMetadataHandler(),
	get_component_source: new GetComponentSourceHandler(),
	get_component_docs: new GetComponentDocsHandler(),
	search_components: new SearchComponentsHandler(),
};

const baseHandler = createToolCallHandler(handlers, 'component');

export function getComponentTools() {
	return getToolsFromHandlers(handlers);
}

export async function handleComponentToolCall(
	request: CallToolRequest,
	metadata: Record<string, ComponentMetadata>,
): Promise<CallToolResult> {
	const argsWithMetadata = { ...request.params.arguments, _metadata: metadata };
	const requestWithMetadata: CallToolRequest = {
		...request,
		params: {
			...request.params,
			arguments: argsWithMetadata,
		},
	};
	
	return baseHandler(requestWithMetadata);
}
