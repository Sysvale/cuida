import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { ContrastCheckerInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetContrastCheckerHandler extends AbstractMcpTool<typeof ContrastCheckerInputSchema> {
	name = 'get_contrast_checker';
	description = 'Get the contrast checker documentation';
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
