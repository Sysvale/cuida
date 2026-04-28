import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { PreviewBuilderInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetPreviewBuilderHandler extends AbstractMcpTool<typeof PreviewBuilderInputSchema> {
	name = 'get_preview_builder';
	audience = 'contributor';
	description = `[DS contributor tool] Gets the previewBuilder utility documentation for component previews.
Use this tool when you need to create visual previews of components.
Returns: Markdown documentation with usage examples.
Not suitable for: getting component docs (use get_component_docs), getting other utilities.`;
	schema = PreviewBuilderInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(PreviewBuilderInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/preview-builder.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
