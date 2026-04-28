import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { ApiTableInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetApiTableHandler extends AbstractMcpTool<typeof ApiTableInputSchema> {
	name = 'get_api_table';
	audience = 'contributor';
	description = `[DS contributor tool] Gets the API table utility documentation for generating component prop tables.
Use this tool when you need to generate markdown tables for component props documentation.
Returns: Markdown documentation for API table utility.
Not suitable for: getting component docs (use get_component_docs), getting component metadata.`;
	schema = ApiTableInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(ApiTableInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/api-table.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
