import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { FontWeightInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetFontWeightHandler extends AbstractMcpTool<typeof FontWeightInputSchema> {
	name = 'get_font_weight';
	description = 'Gets the font weight.';
	schema = FontWeightInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(FontWeightInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/foundation/peso-fonte.html');
		const fileContent = await readDocFile(filePath, (virtualDom) => {
			virtualDom.find('td#example').remove();
			virtualDom.find('.table__header-item--last').remove();
		});
		return createSuccessResult(fileContent);
	}
}
