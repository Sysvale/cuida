import { z } from 'zod';
import { ComponentMetadata } from '../../../types/index.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createSuccessResult } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';

const ListCategoriesInputSchema = z.object({});

export class ListCategoriesHandler extends AbstractMcpTool<typeof ListCategoriesInputSchema> {
	name = 'list_component_categories';
	audience = 'consumer';
	description = `Lists available component categories in the design system.
Use this tool when discovering what categories of components are available.
Returns: JSON array of {name, description, componentCount}.
Not suitable for: listing specific components (use list_components with category filter), searching components (use search_components).`;
	schema = ListCategoriesInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const metadata = (args as any)._metadata as Record<string, ComponentMetadata>;
		
		const categoryCount: Record<string, number> = {};
		
		Object.values(metadata).forEach((c: ComponentMetadata) => {
			const cat = c.category || 'uncategorized';
			categoryCount[cat] = (categoryCount[cat] || 0) + 1;
		});
		
		const categories = Object.entries(categoryCount).map(([name, count]) => ({
			name,
			description: `Components in the ${name} category`,
			componentCount: count,
		})).sort((a, b) => a.name.localeCompare(b.name));
		
		return createSuccessResult(JSON.stringify(categories, null, 2));
	}
}