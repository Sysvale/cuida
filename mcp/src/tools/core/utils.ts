import { z } from 'zod';
import { CallToolResult, Result, ok, err } from '../../utils/result.js';
import { BaseTool } from './handler.js';

export { z };

export const createErrorResult = (message: string): Result<CallToolResult, Error> => 
	err(new Error(message));

export const createSuccessResult = (text: string): Result<CallToolResult, Error> => 
	ok({ content: [{ type: 'text', text }] });

export function validate(
	schema: z.ZodSchema,
	args: unknown
): Result<unknown, Error> {
	const result = schema.safeParse(args);
	if (!result.success) {
		const messages = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`);
		return err(new Error(messages.join('; ')));
	}
	return ok(result.data);
}

export function getToolsFromHandlers(handlers: Record<string, BaseTool>) {
	return Object.values(handlers).map((handler) => ({
		name: handler.name,
		description: handler.description,
		inputSchema: handler.inputSchema || { type: 'object', properties: {} },
	}));
}
