import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { PlaygroundBuilderInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetPlaygroundBuilderHandler extends AbstractMcpTool<typeof PlaygroundBuilderInputSchema> {
	name = 'get_playground_builder';
	audience = 'contributor';
	description = `[DS contributor tool] Gets the playgroundBuilder utility documentation for creating interactive playgrounds.
Use this tool when you need to build live code playgrounds for documentation.
Returns: Markdown documentation with usage examples.
Not suitable for: getting component docs (use get_component_docs), getting other utilities.`;
	schema = PlaygroundBuilderInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(PlaygroundBuilderInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/playground-builder.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
