import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { BaseTool, createToolCallHandler } from '../core/handler.js';
import { ListTokenGroupsHandler } from './handlers/list.js';
import { GetTokenGroupHandler } from './handlers/get.js';
import { GetTokenValueHandler } from './handlers/value.js';
import { getToolsFromHandlers } from '../core/utils.js';

const handlers: Record<string, BaseTool> = {
	list_token_groups: new ListTokenGroupsHandler(),
	get_token_group: new GetTokenGroupHandler(),
	get_token_value: new GetTokenValueHandler(),
};

const baseHandler = createToolCallHandler(handlers, 'token');

export function getTokenTools(includeContributor: boolean = false) {
	return getToolsFromHandlers(handlers, includeContributor);
}

export async function handleTokenToolCall(request: CallToolRequest): Promise<CallToolResult> {
	return baseHandler(request);
}
