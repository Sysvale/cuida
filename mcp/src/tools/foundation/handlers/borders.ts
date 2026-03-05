import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { BordersInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetBordersHandler extends AbstractMcpTool<typeof BordersInputSchema> {
	name = 'get_borders';
	description = 'Gets the borders tokens.';
	schema = BordersInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(BordersInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/foundation/bordas.html');
		const fileContent = await readDocFile(filePath, (virtualDom) => {
			virtualDom.find('td#sample').remove();
			virtualDom.find('.table__header-item--last').remove();
		});
		return createSuccessResult(fileContent);
	}
}
