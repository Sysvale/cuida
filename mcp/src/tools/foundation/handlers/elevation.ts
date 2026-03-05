import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { ElevationInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetElevationHandler extends AbstractMcpTool<typeof ElevationInputSchema> {
	name = 'get_elevation';
	description = 'Gets the elevations tokens.';
	schema = ElevationInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(ElevationInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/foundation/elevation.html');
		const fileContent = await readDocFile(filePath, (virtualDom) => {
			virtualDom.find('#example').remove();
			virtualDom.find('.table__header-item--last').remove();
		});
		return createSuccessResult(fileContent);
	}
}
