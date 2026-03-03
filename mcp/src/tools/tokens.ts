import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { listTokenFiles, readTokenFile } from '../readers/tokens.js';

export function getTokenTools() {
	return [
		{
			name: 'list_token_groups',
			description: 'Lists the available groups of design tokens (e.g., colors, spacing).',
			inputSchema: { type: 'object', properties: {} },
		},
		{
			name: 'get_token_group',
			description: 'Gets the raw SCSS content for a specific group of design tokens.',
			inputSchema: {
				type: 'object',
				properties: {
					group_name: {
						type: 'string',
						description: 'The name of the token group to retrieve (e.g., "colors").',
					},
				},
				required: ['group_name'],
			},
		},
	];
}

export async function handleTokenToolCall(request: CallToolRequest): Promise<CallToolResult> {
	const { name, arguments: args } = request.params;

	switch (name) {
		case 'list_token_groups': {
			const files = await listTokenFiles();
			return {
				content: [{ type: 'text', text: JSON.stringify(files, null, 2) }],
			};
		}

		case 'get_token_group': {
			const groupName = args?.group_name as string;
			if (!groupName) {
				throw new Error('Group name is required for get_token_group.');
			}
			const fileContent = await readTokenFile(groupName);
			return {
				content: [{ type: 'text', text: fileContent }],
			};
		}

		default:
			throw new Error(`The tool "${name}" is not a known token tool.`);
	}
}
