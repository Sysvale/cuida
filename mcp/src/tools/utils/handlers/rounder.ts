import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { RounderInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetRounderHandler extends AbstractMcpTool<typeof RounderInputSchema> {
	name = 'get_rounder';
	audience = 'contributor';
	description = `[DS contributor tool] Gets the rounder utility documentation for number rounding.
Use this tool when you need to round numbers to specific decimal places.
Returns: Markdown documentation with usage examples.
Not suitable for: getting component docs (use get_component_docs), getting other utilities.`;
	schema = RounderInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(RounderInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/rounder.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
