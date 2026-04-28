import { z } from 'zod';
import { readTokenFile } from '../../../readers/tokens.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { GetTokenGroupInputSchema } from '../schemas/index.js';

const GetTokenValueInputSchema = z.object({
	token_name: z.string()
		.min(1, 'Token name is required')
		.describe('Name of the token (e.g., "brand-primary", "spacing-xs")'),
	token_category: z.string()
		.optional()
		.describe('Token category to search in (e.g., "colors", "spacing")'),
});

export class GetTokenValueHandler extends AbstractMcpTool<typeof GetTokenValueInputSchema> {
	// TODO: Entender essa implementação
	name = 'get_token_value';
	description = `Gets the value of a specific design token in JSON format.
Use this tool when you need the actual value of a token (e.g., color hex, spacing value) for code generation.
Returns: JSON object with {tokenName, value, type}.
Not suitable for: listing all token groups (use list_token_groups), getting raw SCSS (use get_token_group).`;
	schema = GetTokenValueInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(GetTokenValueInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}

		const data = parsed.data as { token_name: string; token_category?: string };
		const category = data.token_category || 'colors';
		
		try {
			const scssContent = await readTokenFile(category);
			const regex = new RegExp(`\\$${data.token_name}\\s*:\\s*([^;]+);`, 'i');
			const match = scssContent.match(regex);
			
			if (!match) {
				return createErrorResult(`Token "${data.token_name}" not found in category "${category}".`);
			}

			return createSuccessResult(JSON.stringify({
				tokenName: data.token_name,
				value: match[1].trim(),
				type: 'color',
			}, null, 2));
		} catch (error) {
			return createErrorResult(`Token "${data.token_name}" not found in category "${category}".`);
		}
	}
}