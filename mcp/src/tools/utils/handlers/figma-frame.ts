import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { FigmaFrameInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetFigmaFrameHandler extends AbstractMcpTool<typeof FigmaFrameInputSchema> {
	name = 'get_figma_frame';
	audience = 'contributor';
	description = `[DS contributor tool] Gets the figmaFrame utility documentation for Figma integration.
Use this tool when you need to embed Figma frames in documentation.
Returns: Markdown documentation with usage examples.
Not suitable for: getting component docs (use get_component_docs), getting other utilities.`;
	schema = FigmaFrameInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(FigmaFrameInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/figma-frame.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
