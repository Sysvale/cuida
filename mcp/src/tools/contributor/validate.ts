import { z } from 'zod';
import * as fs from 'fs/promises';
import path from 'node:path';
import { ComponentMetadata } from '../../types/index.js';
import { AbstractMcpTool } from '../core/handler.js';
import { createSuccessResult, createErrorResult, validate } from '../core/utils.js';
import { Result, CallToolResult } from '../../utils/result.js';
import { ROOT_DIR } from '../../utils/paths.js';

const ValidateComponentStructureInputSchema = z.object({
	name: z.string()
		.min(1, 'Component name is required')
		.describe('The name of the component to validate (e.g., "CdsButton").'),
});

export class ValidateComponentStructureHandler extends AbstractMcpTool<typeof ValidateComponentStructureInputSchema> {
	name = 'validate_component_structure';
	audience = 'contributor';
	description = `[DS contributor tool] Validates a component's .vue file has required sections.
Use this tool when reviewing new components before PR submission to ensure they follow DS conventions.
Returns: JSON object with {valid, issues: string[], warnings: string[]}.
Not suitable for: listing components (use list_components), searching components (use search_components).`;
	schema = ValidateComponentStructureInputSchema;

	async execute(args: Record<string, unknown>): Promise<Result<CallToolResult, Error>> {
		const parsed = validate(ValidateComponentStructureInputSchema, args);
		if (!parsed.success) {
			return createErrorResult(parsed.error.message);
		}

		const data = parsed.data as { name: string };
		const metadata = (args as any)._metadata as Record<string, ComponentMetadata>;
		
		const component = metadata[data.name];
		if (!component) {
			return createErrorResult(`Component "${data.name}" not found.`);
		}
		
		const sourcePath = component.sourceFiles?.[0];
		if (!sourcePath) {
			return createErrorResult(`No source file found for component "${data.name}".`);
		}
		
		const fullPath = path.resolve(ROOT_DIR, sourcePath);
		
		const content = await fs.readFile(fullPath, 'utf-8');
		
		const issues: string[] = [];
		const warnings: string[] = [];
		
		if (!content.includes('<template>')) {
			issues.push('Missing <template> section');
		}
		
		if (!content.includes('<script') && !content.includes('<script>')) {
			issues.push('Missing <script> section');
		}
		
		const hasProps = content.includes('defineProps') || content.includes('props:') || content.includes('props =');
		const hasEmits = content.includes('defineEmits') || content.includes('emits:') || content.includes('emits =');
		
		if (!hasProps && !content.includes('<script')) {
			// Only warn if there's a script section
		} else if (!hasProps) {
			warnings.push('No props definition found (defineProps or props:)');
		}
		
		if (!hasEmits && !content.includes('<script')) {
			// Only warn if there's a script section
		} else if (!hasEmits) {
			warnings.push('No emits definition found (defineEmits or emits:)');
		}
		
		const hasExportDefault = content.includes('export default') || content.includes('defineOptions');
		if (!hasExportDefault) {
			warnings.push('No export default found - component may need explicit name/export');
		}
		
		const hasTypescript = content.includes('<script lang="ts">') || content.includes('<script setup lang="ts">');
		if (!hasTypescript) {
			warnings.push('Consider using TypeScript (<script lang="ts">)');
		}
		
		return createSuccessResult(JSON.stringify({
			valid: issues.length === 0,
			issues,
			warnings,
		}, null, 2));
	}
}