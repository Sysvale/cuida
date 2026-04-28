import { ComponentMetadata } from '../../../types/index.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { findComponent } from '../utils/find-component.js';
import { GetComponentMetadataInputSchema } from '../schemas/index.js';

export class GetComponentMetadataHandler extends AbstractMcpTool<typeof GetComponentMetadataInputSchema> {
	name = 'get_component_metadata';
	audience = 'consumer';
	description = `Gets complete metadata for a design system component including props, events, and slots.
Use this tool when you need to understand a component's API surface (its props, events, slots, and their types).
Returns: JSON object with {displayName, description, props: {name, type, required, defaultValue}[], events: {name, type}[], slots: {name, scoped, bindings}[], sourceFiles: string[], category: string}.
Not suitable for: searching components by keyword (use search_components), listing all components (use list_components with optional category filter).`;
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
