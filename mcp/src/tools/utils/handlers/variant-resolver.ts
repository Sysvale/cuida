import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { VariantResolverInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetVariantResolverHandler extends AbstractMcpTool<typeof VariantResolverInputSchema> {
	name = 'get_variant_resolver';
	description = 'Get the variant resolver documentation';
	schema = VariantResolverInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(VariantResolverInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/variant-resolver.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
