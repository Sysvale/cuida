import { ComponentMetadata } from '../../../types/index.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { ListComponentsInputSchema } from '../schemas/index.js';

export class ListComponentsHandler extends AbstractMcpTool<typeof ListComponentsInputSchema> {
	name = 'list_components';
	description = 'Lists available UI components, with an optional category filter.';
	schema = ListComponentsInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(ListComponentsInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}

		const data = parsed.data as { category?: string };
		const category: string | undefined = data.category;
		const metadata = (args as any)._metadata as Record<string, ComponentMetadata>;
		
		const simplifiedComponents = Object.values(metadata).map((component) => ({
			name: component.displayName,
			description: component.description || 'No description available.',
			category: component?.category || 'general',
		})).filter(
			(mappedComponent) => category 
				? mappedComponent.category.toLowerCase() === category.toLowerCase() 
				: true
		);

		return createSuccessResult(JSON.stringify(simplifiedComponents, null, 2));
	}
}
