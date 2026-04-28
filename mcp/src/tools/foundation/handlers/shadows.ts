import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { ShadowsInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetShadowsHandler extends AbstractMcpTool<typeof ShadowsInputSchema> {
	name = 'get_shadows';
	description = `Gets the shadow tokens for visual depth.
Use this tool when you need box-shadow values for cards, modals, and elevated elements.
Returns: Markdown table with shadow values.
Not suitable for: getting elevation (use get_elevation), getting borders (use get_borders).`;
	schema = ShadowsInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(ShadowsInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/foundation/shadow.html');
		const fileContent = await readDocFile(filePath, (virtualDom) => {
			virtualDom.find('#example').remove();
			virtualDom.find('.table__header-item--last').remove();
		});
		return createSuccessResult(fileContent);
	}
}
