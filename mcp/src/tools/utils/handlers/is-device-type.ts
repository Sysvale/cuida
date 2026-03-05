import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { IsDeviceTypeInputSchema } from '../schemas/index.js';
import { readDocFile } from '../../../readers/docs.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class GetIsDeviceTypeHandler extends AbstractMcpTool<typeof IsDeviceTypeInputSchema> {
	name = 'get_is_device_type';
	description = 'Get the is device type documentation';
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
