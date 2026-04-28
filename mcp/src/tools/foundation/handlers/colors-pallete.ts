import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { ColorsPalleteInputSchema } from '../schemas/index.js';
import { generateColorPaletteMarkdown } from '../utils/pallete-generator.js';

export class GetColorsPalleteHandler extends AbstractMcpTool<typeof ColorsPalleteInputSchema> {
	name = 'get_colors_pallete';
	description = `Gets the complete color palette with hex values for each shade.
Use this tool when you need to see all available colors in the design system with their hex codes.
Returns: Markdown table with {Shade, Hexadecimal, Token SCSS}.
Not suitable for: getting specific token values (use get_token_group for raw SCSS), getting typography (use get_typography).`;
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
