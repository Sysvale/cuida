import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { PrinciplesInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetPrinciplesHandler extends AbstractMcpTool<typeof PrinciplesInputSchema> {
	name = 'get_principles';
	description = 'Gets the design system principles.';
	schema = PrinciplesInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(PrinciplesInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/foundation/principles.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
