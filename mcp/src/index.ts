import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
	CallToolRequest,
} from '@modelcontextprotocol/sdk/types.js';
import { readMetadata } from './readers/metadata.js';
import { getComponentTools, handleComponentToolCall } from './tools/components/index.js';
import { getTokenTools, handleTokenToolCall as handleTokenTool } from './tools/tokens/index.js';
import { getUtilsTools, handleUtilsToolCall } from './tools/utils/index.js';
import { logger } from './utils/logger.js';
import { getFoundationTools, handleFoundationToolCall } from './tools/foundation/index.js';

const server = new Server(
	{
		name: 'cuida-mcp',
		version: '0.0.1'
	},
	{
		capabilities: {
			tools: {},
		},
	}
);

export async function main() {
	const metadata = await readMetadata();

	const componentTools = getComponentTools();
	const tokenTools = getTokenTools();
	const foundationTools = getFoundationTools();
	const utilsTools = getUtilsTools();

	const allTools = [
		{
			name: 'hello_mcp',
			description: '>> Um teste inicial para verificar a conexão do servidor.',
			inputSchema: { type: 'object', properties: { name: { type: 'string' } } },
		},
		...componentTools,
		...tokenTools,
		...foundationTools,
		...utilsTools,
	];

	const componentToolNames = new Set(componentTools.map(t => t.name));
	const tokenToolNames = new Set(tokenTools.map(t => t.name));
	const foundationToolNames = new Set(foundationTools.map(t => t.name));
	const utilsToolNames = new Set(utilsTools.map(t => t.name));

	server.setRequestHandler(ListToolsRequestSchema, async () => {
		return { tools: allTools };
	});

	server.setRequestHandler(CallToolRequestSchema, async (request) => {
		const toolName = request.params.name;

		logger.info('Tool call received', { 
			tool: request.params.name, 
			args: request.params.arguments 
		});

		if (toolName === 'hello_mcp') {
			const name = request.params.arguments?.name ?? 'Mundo';
			return {
				content: [ { type: 'text', text: `Olá, ${name}! O servidor MCP está operando.` } ],
			};
		}

		if (componentToolNames.has(toolName)) {
			return await handleComponentToolCall(request as CallToolRequest, metadata);
		}

		if (tokenToolNames.has(toolName)) {
			return await handleTokenTool(request as CallToolRequest);
		}

		if (foundationToolNames.has(toolName)) {
			return await handleFoundationToolCall(request as CallToolRequest);
		}

		if(utilsToolNames.has(toolName)) {
			return await handleUtilsToolCall(request as CallToolRequest);
		}

		throw new Error(`Ferramenta "${toolName}" não encontrada`);
	});

	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error('Servidor MCP rodando via STDIO');
	logger.info('SERVER RODANDO' + new Date().toISOString());
}

main().catch((error) => {
	console.error('Erro fatal no servidor:', error);
	process.exit(1);
});