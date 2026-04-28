import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { HasSlotInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetHasSlotHandler extends AbstractMcpTool<typeof HasSlotInputSchema> {
	name = 'get_has_slot';
	audience = 'contributor';
	description = `[DS contributor tool] Gets the hasSlot utility documentation for checking slot content.
Use this tool when you need to check if a slot has content in Vue components.
Returns: Markdown documentation with usage examples.
Not suitable for: getting component docs (use get_component_docs), getting other utilities.`;
	schema = HasSlotInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(HasSlotInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/has-slot.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
