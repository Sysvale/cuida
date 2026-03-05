import { readTokenFile } from '../../../readers/tokens.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { GetTokenGroupInputSchema } from '../schemas/index.js';

export class GetTokenGroupHandler extends AbstractMcpTool<typeof GetTokenGroupInputSchema> {
	name = 'get_token_group';
	description = 'Gets the raw SCSS content for a specific group of design tokens.';
	schema = GetTokenGroupInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(GetTokenGroupInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}

		const data = parsed.data as { group_name: string };
		const group_name: string = data.group_name;
		const fileContent = await readTokenFile(group_name);
		return createSuccessResult(fileContent);
	}
}
