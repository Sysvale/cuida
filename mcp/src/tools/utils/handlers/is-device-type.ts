import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { IsDeviceTypeInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetIsDeviceTypeHandler extends AbstractMcpTool<typeof IsDeviceTypeInputSchema> {
	name = 'get_is_device_type';
	audience = 'consumer';
	description = `Gets the isDeviceType utility documentation for device detection.
Use this tool when you need to detect device type (mobile, tablet, desktop) in Vue applications.
Returns: Markdown documentation with usage examples.
Not suitable for: getting component docs (use get_component_docs), getting other utilities.`;
	schema = IsDeviceTypeInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(IsDeviceTypeInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}
		const __dirname = path.dirname(fileURLToPath(import.meta.url));
		const filePath = path.resolve(__dirname, '../../../../../docs/.vitepress/dist/utils/is-device-type.html');
		const fileContent = await readDocFile(filePath);
		return createSuccessResult(fileContent);
	}
}
