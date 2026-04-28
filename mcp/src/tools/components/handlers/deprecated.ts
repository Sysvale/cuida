import { z } from 'zod';
import { ComponentMetadata } from '../../../types/index.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createSuccessResult } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';

const DeprecatedComponentsInputSchema = z.object({});

export class GetDeprecatedComponentsHandler extends AbstractMcpTool<typeof DeprecatedComponentsInputSchema> {
	// TODO: Entender se é útil e como melhorar identificar os componentes marcados como depracated
	name = 'get_deprecated_components';
	audience = 'consumer';
	description = `Gets all deprecated components in the design system.
Use this tool when auditing codebase for deprecated component usage or planning migrations.
Returns: JSON array of {displayName, deprecatedAt, replacement?, deprecationMessage, category}.
Not suitable for: searching all components (use search_components), getting specific component metadata (use get_component_metadata).`;
	schema = DeprecatedComponentsInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const metadata = (args as any)._metadata as Record<string, ComponentMetadata>;
		
		const deprecated = Object.values(metadata).filter(c => c.deprecated === true);
		
		return createSuccessResult(JSON.stringify(
			deprecated.map(c => ({
				displayName: c.displayName,
				description: c.description,
				replacement: c.replacement,
				deprecatedAt: c.deprecatedAt,
				category: c.category,
			})), null, 2
		));
	}
}