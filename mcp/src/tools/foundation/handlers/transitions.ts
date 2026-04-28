import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { TransitionsInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetTransitionsHandler extends AbstractMcpTool<typeof TransitionsInputSchema> {
	name = 'get_transitions';
	description = `Gets the transition tokens for animations.
Use this tool when you need CSS transition/duration/timing values for animations.
Returns: Markdown table with transition values.
Not suitable for: getting shadows (use get_shadows), getting elevation (use get_elevation).`;
	schema = TransitionsInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(TransitionsInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/foundation/transições.html');
		const fileContent = await readDocFile(filePath, (virtualDom) => {
			virtualDom.find('td#example').remove();
			virtualDom.find('.table__header-item--last').remove();
		});
		return createSuccessResult(fileContent);
	}
}
