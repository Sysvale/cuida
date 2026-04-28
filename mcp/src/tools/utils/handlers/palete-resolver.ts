import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { PaleteResolverInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetPaleteResolverHandler extends AbstractMcpTool<typeof PaleteResolverInputSchema> {
	name = 'get_palete_resolver';
	audience = 'contributor';
	description = `[DS contributor tool] Gets the paletteResolver utility documentation for color palette generation.
Use this tool when you need to generate color palettes programmatically.
Returns: Markdown documentation with usage examples.
Not suitable for: getting component docs (use get_component_docs), getting other utilities.`;
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
