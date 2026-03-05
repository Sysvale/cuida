import { ComponentMetadata } from '../../../types/index.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { findComponent } from '../utils/find-component.js';
import { GetComponentMetadataInputSchema } from '../schemas/index.js';

export class GetComponentMetadataHandler extends AbstractMcpTool<typeof GetComponentMetadataInputSchema> {
	name = 'get_component_metadata';
	description = 'Gets the full metadata for a specific component.';
	schema = GetComponentMetadataInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(GetComponentMetadataInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}

		const data = parsed.data as { name: string };
		const name: string = data.name;
		const metadata = (args as any)._metadata as Record<string, ComponentMetadata>;
		const findResult = findComponent(name, metadata);
		
		if (!findResult.success) {
			return createErrorResult(findResult.error.message);
		}

		return createSuccessResult(JSON.stringify(findResult.data, null, 2));
	}
}
