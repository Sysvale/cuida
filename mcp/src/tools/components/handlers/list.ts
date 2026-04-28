import { ComponentMetadata } from '../../../types/index.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { ListComponentsInputSchema, CATEGORIES } from '../schemas/index.js';

export class ListComponentsHandler extends AbstractMcpTool<typeof ListComponentsInputSchema> {
	name = 'list_components';
	audience = 'consumer';
	description = `Lists available UI components in the design system, with an optional category filter.
Use this tool when you need to discover what components are available or get a list of all components.
Returns: JSON array of {name, description, category}.
Not suitable for: searching components by keyword (use search_components), getting specific component details (use get_component_metadata).`;
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
