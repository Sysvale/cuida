import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { PreviewContainerInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetPreviewContainerHandler extends AbstractMcpTool<typeof PreviewContainerInputSchema> {
	name = 'get_preview_container';
	audience = 'contributor';
	description = `[DS contributor tool] Gets the previewContainer utility documentation for component preview layout.
Use this tool when you need to create containers for component previews.
Returns: Markdown documentation with usage examples.
Not suitable for: getting component docs (use get_component_docs), getting other utilities.`;
	schema = PreviewContainerInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(PreviewContainerInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/preview-container.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
