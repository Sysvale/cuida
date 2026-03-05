import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { LogBuilderInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetLogBuilderHandler extends AbstractMcpTool<typeof LogBuilderInputSchema> {
	name = 'get_log_builder';
	description = 'Get the log builder documentation';
	schema = LogBuilderInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(LogBuilderInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/log-builder.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
