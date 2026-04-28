import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { TypographyInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetTypographyHandler extends AbstractMcpTool<typeof TypographyInputSchema> {
	name = 'get_typography';
	description = `Gets the typography tokens including font families, sizes, and line heights.
Use this tool when you need typography style values for CSS (font-family, font-size, line-height).
Returns: Markdown documentation with typography scale values.
Not suitable for: getting color palette (use get_colors_pallete), getting spacing tokens (use get_spacing).`;
	schema = TypographyInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(TypographyInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/foundation/tipografia.html');
		const fileContent = await readDocFile(filePath, (virtualDom) => {
			virtualDom.find('td#sample').remove();
			virtualDom.find('.table__header-item--last').remove();
		});
		return createSuccessResult(fileContent);
	}
}
