import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { DocumentationGuideInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetDocumentationGuideHandler extends AbstractMcpTool<typeof DocumentationGuideInputSchema> {
	name = 'get_documentation_guide';
	audience = 'contributor';
	description = `[DS contributor tool] Gets the documentation guide for contributing to the design system.
Use this tool when you need to understand how to document components properly.
Returns: Markdown documentation guide.
Not suitable for: getting component docs (use get_component_docs), getting component metadata.`;
	schema = DocumentationGuideInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(DocumentationGuideInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/documentation-guide.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
