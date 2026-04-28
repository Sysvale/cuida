import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';
import { AbstractMcpTool } from '../core/handler.js';
import { createSuccessResult, createErrorResult, validate } from '../core/utils.js';
import { Result, CallToolResult } from '../../utils/result.js';

const CheckMetadataFreshnessInputSchema = z.object({});

export class CheckMetadataFreshnessHandler extends AbstractMcpTool<typeof CheckMetadataFreshnessInputSchema> {
	name = 'check_metadata_freshness';
	audience = 'contributor';
	description = `[DS contributor tool] Checks when component metadata was last generated.
Use this tool to determine if metadata is stale and needs regeneration.
Returns: JSON object with {lastGenerated, fileAgeHours, suggestion}.
Not suitable for: listing components (use list_components), searching components (use search_components).`;
	schema = CheckMetadataFreshnessInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		try {
			const docsDir = path.resolve(process.cwd(), 'docs/.docgen/components-metadata.json');
			const stats = await fs.stat(docsDir);
			const ageMs = Date.now() - stats.mtimeMs;
			const ageHours = ageMs / (1000 * 60 * 60);
			
			const suggestion = ageHours > 24 
				? 'Metadata is older than 24 hours. Consider running "npm run generate:docs" from project root.'
				: 'Metadata is recent.';
			
			return createSuccessResult(JSON.stringify({
				lastGenerated: stats.mtime.toISOString(),
				fileAgeHours: Math.round(ageHours * 10) / 10,
				suggestion,
			}, null, 2));
		} catch (error) {
			return createErrorResult('Metadata file not found. Run "npm run generate:docs" from project root.');
		}
	}
}