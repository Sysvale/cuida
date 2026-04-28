import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { RemoveAccentsInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetRemoveAccentsHandler extends AbstractMcpTool<typeof RemoveAccentsInputSchema> {
	name = 'get_remove_accents';
	audience = 'contributor';
	description = `[DS contributor tool] Gets the removeAccents utility documentation for removing diacritical marks.
Use this tool when you need to normalize text by removing accents (e.g., "São Paulo" → "Sao Paulo").
Returns: Markdown documentation with usage examples.
Not suitable for: getting component docs (use get_component_docs), getting other utilities.`;
	schema = RemoveAccentsInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(RemoveAccentsInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/remove-accents.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
