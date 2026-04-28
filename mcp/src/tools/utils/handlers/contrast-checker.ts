import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { ContrastCheckerInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetContrastCheckerHandler extends AbstractMcpTool<typeof ContrastCheckerInputSchema> {
	name = 'get_contrast_checker';
	audience = 'contributor';
	description = `[DS contributor tool] Gets the contrast checker utility documentation for WCAG accessibility compliance.
Use this tool when you need to check if color combinations meet WCAG contrast requirements.
Returns: Markdown documentation with contrast ratio calculator.
Not suitable for: getting color palette (use get_colors_pallete), getting typography (use get_typography).`;
	schema = ContrastCheckerInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(ContrastCheckerInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/contrast-checker.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
