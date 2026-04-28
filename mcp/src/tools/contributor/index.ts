import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { BaseTool, createToolCallHandler } from '../core/handler.js';
import { CheckMetadataFreshnessHandler } from './metadata.js';
import { ValidateComponentStructureHandler } from './validate.js';
import { getToolsFromHandlers } from '../core/utils.js';

const handlers: Record<string, BaseTool> = {
	check_metadata_freshness: new CheckMetadataFreshnessHandler(),
	validate_component_structure: new ValidateComponentStructureHandler(),
};

const baseHandler = createToolCallHandler(handlers, 'contributor');

export function getContributorTools(includeContributor: boolean = false) {
	// Contributor tools only; if includeContributor is false, return empty array
	if (!includeContributor) {
		return [];
	}
	return getToolsFromHandlers(handlers, includeContributor);
}

export async function handleContributorToolCall(
	request: CallToolRequest,
	metadataOr_fn: Record<string, any> | (() => Promise<Record<string, any>>),
): Promise<CallToolResult> {
	const isFn = typeof metadataOr_fn === 'function';
	const metadata = isFn 
		? await (metadataOr_fn as () => Promise<Record<string, any>>)()
		: metadataOr_fn as Record<string, any>;
	
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