import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { CdsFloatifyInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetCdsFloatifyHandler extends AbstractMcpTool<typeof CdsFloatifyInputSchema> {
	name = 'get_cds_floatify';
	description = 'Get the cds floatify documentation';
	schema = CdsFloatifyInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(CdsFloatifyInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/cds-floatify.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
