import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { SpacingInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetSpacingHandler extends AbstractMcpTool<typeof SpacingInputSchema> {
	name = 'get_spacing';
	description = 'Gets the spacing.';
	schema = SpacingInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(SpacingInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/foundation/espacamento.html');
		const fileContent = await readDocFile(filePath, (virtualDom) => {
			virtualDom.find('.playground').remove();
			const playground = virtualDom.find('#playground');
			playground.nextUntil('hr').remove();
			virtualDom.find('#playground').remove();
		});
		return createSuccessResult(fileContent);
	}
}
