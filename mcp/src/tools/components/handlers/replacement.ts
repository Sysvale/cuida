import { z } from 'zod';
import { ComponentMetadata } from '../../../types/index.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createSuccessResult, createErrorResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { GetComponentMetadataInputSchema } from '../schemas/index.js';

export class GetComponentReplacementHandler extends AbstractMcpTool<typeof GetComponentMetadataInputSchema> {
	// TODO: Faz sentido a fuzzy ou tem que ser o nome exato do componente mesmo?
	name = 'get_component_replacement';
	audience = 'consumer';
	description = `Gets the recommended replacement for a deprecated component.
Use this tool when migrating away from deprecated components to find the suggested replacement.
Returns: JSON object with {displayName, replacement, deprecatedAt, deprecationMessage, category}.
Not suitable for: listing all deprecated components (use get_deprecated_components), listing components (use list_components).`;
	schema = GetComponentMetadataInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(GetComponentMetadataInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}

		const data = parsed.data as { name: string };
		const metadata = (args as any)._metadata as Record<string, ComponentMetadata>;
		
		const component = metadata[data.name];
		if (!component) {
			return createErrorResult(`Component "${data.name}" not found.`);
		}
		
		if (!component.deprecated) {
			return createErrorResult(`Component "${data.name}" is not deprecated. No replacement needed.`);
		}
		
		return createSuccessResult(JSON.stringify({
			displayName: component.displayName,
			replacement: component.replacement || null,
			deprecatedAt: component.deprecatedAt || null,
			deprecationMessage: component.description,
			category: component.category,
		}, null, 2));
	}
}