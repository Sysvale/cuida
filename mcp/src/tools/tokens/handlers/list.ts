import { listTokenFiles } from '../../../readers/tokens.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { ListTokenGroupsInputSchema } from '../schemas/index.js';

export class ListTokenGroupsHandler extends AbstractMcpTool<typeof ListTokenGroupsInputSchema> {
	name = 'list_token_groups';
	description = 'Lists the available groups of design tokens (e.g., colors, spacing).';
	schema = ListTokenGroupsInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(ListTokenGroupsInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}

		const files = await listTokenFiles();
		return createSuccessResult(JSON.stringify(files, null, 2));
	}
}
