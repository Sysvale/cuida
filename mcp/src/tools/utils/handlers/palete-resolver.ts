import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { PaleteResolverInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetPaleteResolverHandler extends AbstractMcpTool<typeof PaleteResolverInputSchema> {
	name = 'get_palete_resolver';
	description = 'Get the palete resolver documentation';
	schema = PaleteResolverInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(PaleteResolverInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/palete-resolver.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
