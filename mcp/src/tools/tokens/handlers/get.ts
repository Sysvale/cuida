import { readTokenFile } from '../../../readers/tokens.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { GetTokenGroupInputSchema } from '../schemas/index.js';

export class GetTokenGroupHandler extends AbstractMcpTool<typeof GetTokenGroupInputSchema> {
	name = 'get_token_group';
	description = `Gets the raw SCSS content for a specific group of design tokens.
Use this tool when you need the full SCSS token definitions for a token group (colors, spacing, etc.) for use in stylesheets.
Returns: Raw SCSS content as string with $variable definitions.
Not suitable for: listing token groups (use list_token_groups), getting token values in JSON (use get_token_value if available).`;
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
