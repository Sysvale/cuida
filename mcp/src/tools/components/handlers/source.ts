import { ComponentMetadata } from '../../../types/index.js';
import { readSourceFile } from '../../../readers/source.js';
import { AbstractMcpTool } from '../../core/handler.js';
import { createErrorResult, createSuccessResult, validate } from '../../core/utils.js';
import { Result, CallToolResult } from '../../../utils/result.js';
import { findComponent } from '../utils/index.js';
import { GetComponentSourceInputSchema } from '../schemas/index.js';

export class GetComponentSourceHandler extends AbstractMcpTool<typeof GetComponentSourceInputSchema> {
	name = 'get_component_source';
	description = 'Gets the source code for a specific component.';
	schema = GetComponentSourceInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(GetComponentSourceInputSchema, args);
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

		const { sourceFiles } = findResult.data;
		if (!sourceFiles?.[0]) {
			return createErrorResult(`Source file for component "${name}" not found.`);
		}

		const sourceCode = await readSourceFile(sourceFiles[0]);
		return createSuccessResult(sourceCode);
	}
}
