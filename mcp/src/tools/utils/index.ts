import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { BaseTool, createToolCallHandler } from '../core/handler.js';
import {
	GetDocumentationGuideHandler,
} from './handlers/index.js';
import { getToolsFromHandlers } from '../core/utils.js';

const handlers: Record<string, BaseTool> = {
	get_documentation_guide: new GetDocumentationGuideHandler(),
};

const baseHandler = createToolCallHandler(handlers, 'token');

export function getUtilsTools() {
	return getToolsFromHandlers(handlers)
};

export async function handleUtilsToolCall(request: CallToolRequest): Promise<CallToolResult> {
	return baseHandler(request);
}
