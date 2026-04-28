import { ComponentMetadata } from '../../../types/index.js';
import { searchComponents } from '../../../indexer/search.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { SearchComponentsInputSchema } from '../schemas/index.js';

export class SearchComponentsHandler extends AbstractMcpTool<typeof SearchComponentsInputSchema> {
	name = 'search_components';
	audience = 'consumer';
	description = `Searches for components by a query string using fuzzy matching.
Use this tool when you need to find components matching a keyword or use case (e.g., "button", "modal", "input").
Returns: JSON array of {displayName, description, category, searchRelevance} sorted by relevance.
Not suitable for: listing all components (use list_components), getting specific component details (use get_component_metadata).`;
	schema = SearchComponentsInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(SearchComponentsInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}

		const data = parsed.data as { query: string };
		const query: string = data.query;
		const metadata = (args as any)._metadata as Record<string, ComponentMetadata>;
		const searchResults = searchComponents(query, metadata);
		
		return createSuccessResult(JSON.stringify(searchResults, null, 2));
	}
}
