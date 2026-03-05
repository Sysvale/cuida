import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { Result } from '../../utils/result.js';
import { z } from 'zod';

export interface ToolInputSchema {
	type: 'object';
	properties: Record<string, { type: string; description: string }>;
	required?: string[];
}

export interface BaseTool {
	name: string;
	description: string;
	inputSchema?: ToolInputSchema;
	execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>>;
}

export abstract class AbstractMcpTool<T extends z.ZodSchema> implements BaseTool {
	abstract name: string;
	abstract description: string;
	protected abstract schema: T;

	get inputSchema() {
		return z.toJSONSchema(this.schema) as ToolInputSchema;
	}

	abstract execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>>;
}

export function createToolCallHandler(
	handlers: Record<string, BaseTool>,
	toolType: string
) {
	return async function handleToolCall(request: CallToolRequest): Promise<CallToolResult> {
		const { logger } = await import('../../utils/logger.js');
		
		try {
			const { name, arguments: args } = request.params;
			
			logger.debug('Tool execution started', { tool: name, args });
			
			const handler = handlers[name];

			if (!handler) {
				logger.debug('Tool not found', { tool: name });
				return {
					content: [{ type: 'text', text: `Error: The tool "${name}" is not a known ${toolType} tool.` }],
					isError: true,
				};
			}

			const result = await handler.execute(args ?? {});

			if (!result.success) {
				logger.debug('Tool execution failed', { tool: name, error: result.error.message });
				return {
					content: [{ type: 'text', text: `Error: ${result.error.message}` }],
					isError: true,
				};
			}

			logger.debug('Tool execution success', { tool: name });
			return result.data;

		} catch (error) {
			const { logger: log } = await import('../../utils/logger.js');
			const errorMessage = error instanceof Error ? error.message : String(error);
			log.error(`Unexpected error in handle${toolType}ToolCall`, { error: errorMessage });
			return {
				content: [{ type: 'text', text: `Error: ${errorMessage}` }],
				isError: true,
			};
		}
	};
}
