import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { VariantResolverInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetVariantResolverHandler extends AbstractMcpTool<typeof VariantResolverInputSchema> {
	name = 'get_variant_resolver';
	audience = 'contributor';
	description = `[DS contributor tool] Gets the variant resolver utility documentation.
Use this tool when you need to implement variant-based rendering logic in components.
Returns: Markdown documentation with variant resolver examples.
Not suitable for: getting component docs (use get_component_docs), getting other utilities.`;
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
