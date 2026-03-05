import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { ColorsPalleteInputSchema } from '../schemas/index.js';
import { generateColorPaletteMarkdown } from '../utils/pallete-generator.js';

export class GetColorsPalleteHandler extends AbstractMcpTool<typeof ColorsPalleteInputSchema> {
	name = 'get_colors_pallete';
	description = 'Gets the colors pallete.';
	schema = ColorsPalleteInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(ColorsPalleteInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const fileContent = await generateColorPaletteMarkdown();
		return createSuccessResult(fileContent);
	}
}
