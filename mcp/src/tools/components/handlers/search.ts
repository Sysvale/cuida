import { ComponentMetadata } from '../../../types/index.js';
import { searchComponents } from '../../../indexer/search.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { SearchComponentsInputSchema } from '../schemas/index.js';

export class SearchComponentsHandler extends AbstractMcpTool<typeof SearchComponentsInputSchema> {
	name = 'search_components';
	description = 'Searches for components by a query string.';
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
