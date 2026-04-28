import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { UseToastInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetUseToastHandler extends AbstractMcpTool<typeof UseToastInputSchema> {
	name = 'get_use_toast';
	audience = 'consumer';
	description = `Gets the useToast composable documentation.
Use this tool when you need to implement toast notifications in components.
Returns: Markdown documentation with useToast API and examples.
Not suitable for: getting component docs (use get_component_docs), getting other utilities.`;
	schema = UseToastInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(UseToastInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/use-toast.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
