import { ComponentMetadata } from '../../../types/index.js';
import { readDocFile } from '../../../readers/docs.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { findComponent } from '../utils/index.js';
import { GetComponentDocsInputSchema } from '../schemas/index.js';
import { VITEPRESS_DIST_DIR } from '../../../utils/paths.js';

export class GetComponentDocsHandler extends AbstractMcpTool<typeof GetComponentDocsInputSchema> {
	name = 'get_component_docs';
	description = 'Gets the documentation for a specific component.';
	schema = GetComponentDocsInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(GetComponentDocsInputSchema, args);
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

		const { builtDocPath } = findResult.data;

		if (!builtDocPath) {
			return createErrorResult(`Documentation for component "${name}" not found.`);
		}

		const docContent = await readDocFile(`${VITEPRESS_DIST_DIR}/${builtDocPath}`);
		return createSuccessResult(docContent);
	}
}
