import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { IconographyInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetIconographyHandler extends AbstractMcpTool<typeof IconographyInputSchema> {
	name = 'get_iconography';
	description = 'Gets the icons tokens.';
	schema = IconographyInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(IconographyInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/foundation/iconografia.html');
		const fileContent = await readDocFile(filePath, (virtualDom) => {
			virtualDom.nextAll('.source-code__title').remove();
			virtualDom.find('.source-code__title').remove();
		});
		return createSuccessResult(fileContent);
	}
}
