import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
	ListResourcesRequestSchema,
	ListResourceTemplatesRequestSchema,
	ReadResourceRequestSchema,
	ListPromptsRequestSchema,
	GetPromptRequestSchema,
	CallToolRequest,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs/promises';
import { readMetadata } from './readers/metadata.js';
import { listTokenFiles } from './readers/tokens.js';
import { getComponentTools, handleComponentToolCall } from './tools/components/index.js';
import { getTokenTools, handleTokenToolCall as handleTokenTool } from './tools/tokens/index.js';
import { getUtilsTools, handleUtilsToolCall } from './tools/utils/index.js';
import { getContributorTools, handleContributorToolCall } from './tools/contributor/index.js';
import { logger } from './utils/logger.js';
import { getFoundationTools, handleFoundationToolCall } from './tools/foundation/index.js';
import { DOCS_DIR } from './utils/paths.js';
import { ComponentMetadata } from './types/index.js';

const server = new Server(
	{
		name: 'cuida-mcp',
		version: '0.0.1'
	},
	{
		capabilities: {
			tools: {},
			resources: {},
			prompts: {},
		},
	}
);

const API_VERSION = '1.0.0';

let metadataCache: Record<string, ComponentMetadata> | null = null;
let metadataLoaded = false;

async function getMetadata(): Promise<Record<string, ComponentMetadata>> {
	if (metadataLoaded && metadataCache) {
		return metadataCache;
	}
	metadataCache = await readMetadata();
	metadataLoaded = true;
	return metadataCache;
}

async function checkPrerequisites() {
	try {
		const metadataPath = `${DOCS_DIR}/.docgen/components-metadata.json`;
		await fs.access(metadataPath);
	} catch {
		throw new Error(
			`Required metadata file not found. Please run "npm run generate:docs" ` +
			`from the project root to generate component metadata.`
		);
	}
}

export async function main() {
	await checkPrerequisites();

	const args = process.argv.slice(2);
	const includeContributor = args.includes('--include-contributor');

	const componentTools = getComponentTools(includeContributor);
	const tokenTools = getTokenTools(includeContributor);
	const foundationTools = getFoundationTools(includeContributor);
	const utilsTools = getUtilsTools(includeContributor);
	const contributorTools = getContributorTools(includeContributor);

	const allTools = [
		{
			name: 'hello_mcp',
			description: 'A simple test tool to verify the server is running. Use this tool to test MCP server connectivity. Returns: A greeting message.',
			inputSchema: { type: 'object', properties: { name: { type: 'string', description: 'Name to greet' } } },
		},
		{
			name: 'mcp_version',
			description: 'Returns the MCP server API version with metadata freshness. Use this tool to check compatibility and if docs need regeneration. Returns: {version: string, supportedTools: string[], minimumClientVersion: string, metadataLastGenerated?: string}.',
			inputSchema: { type: 'object', properties: {} },
		},
		...componentTools,
		...tokenTools,
		...foundationTools,
		...utilsTools,
		...contributorTools,
	];

	const componentToolNames = new Set(componentTools.map(t => t.name));
	const tokenToolNames = new Set(tokenTools.map(t => t.name));
	const foundationToolNames = new Set(foundationTools.map(t => t.name));
	const utilsToolNames = new Set(utilsTools.map(t => t.name));
	const contributorToolNames = new Set(contributorTools.map(t => t.name));

	server.setRequestHandler(ListToolsRequestSchema, async () => {
		return { tools: allTools };
	});

	server.setRequestHandler(ListResourcesRequestSchema, async () => {
		const tokenGroups = await listTokenFiles();
		return {
			resources: [
				{
					uri: 'component://list',
					name: 'Component List',
					description: 'Complete list of design system components with basic info',
					mimeType: 'application/json',
				},
				// TODO: Não está retornando os tokens devidamente, apenas a lista de arquivos/grupos
				{
					uri: 'token://list',
					name: 'Token Groups',
					description: 'Available design token groups',
					mimeType: 'application/json',
				},
			],
		};
	});

	server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
		const uri = request.params.uri;
		const metadata = await getMetadata();
		
		if (uri === 'component://list') {
			return {
				contents: [{
					uri,
					mimeType: 'application/json',
					text: JSON.stringify(Object.values(metadata).map(c => ({
						displayName: c.displayName,
						category: c.category,
						description: c.description,
					}))),
				}],
			};
		}

		if (uri === 'token://list') {
			const tokenGroups = await listTokenFiles();
			return {
				contents: [{
					uri,
					mimeType: 'application/json',
					text: JSON.stringify(tokenGroups),
				}],
			};
		}

		throw new Error(`Resource "${uri}" not found`);
	});

	server.setRequestHandler(ListPromptsRequestSchema, async () => {
		const prompts = [];
		
		// generate-component-props-table is a contributor tool
		if (includeContributor) {
			prompts.push({
				name: 'generate-component-props-table',
				description: '[DS contributor tool] Generate a markdown table of component props for documentation',
				arguments: [
					{ name: 'componentName', description: 'Name of the component (e.g., CdsButton)' },
				],
			});
		}
		
		return { prompts };
	});

	server.setRequestHandler(GetPromptRequestSchema, async (request) => {
		const { name, arguments: args = {} } = request.params;
		const metadata = await getMetadata();
		
		// TODO: está retornando algumas informações meio quebradas (entender utilidade)
		if (name === 'generate-component-props-table') {
			const requestedComponent = args.componentName;
			
			if (requestedComponent) {
				const component = metadata[requestedComponent];
				if (!component) {
					throw new Error(`Component "${requestedComponent}" not found`);
				}
				
				const propsTable = component.props.map(p => 
					`| ${p.name} | ${p.type.name} | ${p.required ? 'Yes' : 'No'} | ${p.defaultValue?.value || '-'} | ${p.description} |`
				).join('\n');
				
				return {
					messages: [
						{
							role: 'user',
							content: {
								type: 'text',
								text: `# Props for ${component.displayName}\n\n| Prop | Type | Required | Default | Description |\n|------|------|----------|---------|-------------|\n${propsTable}`,
							},
						},
					],
				};
			}

			const allComponentsTable = Object.values(metadata).map(c => 
				`| ${c.displayName} | ${c.category} | ${c.props.length} |`
			).join('\n');
			
			return {
				messages: [
					{
						role: 'user',
						content: {
							type: 'text',
							text: `# All Components\n\n| Component | Category | Props Count |\n|-----------|----------|------------|\n${allComponentsTable}`,
						},
					},
				],
			};
		}
		
		throw new Error(`Prompt "${name}" not found`);
	});

	server.setRequestHandler(CallToolRequestSchema, async (request) => {
		const toolName = request.params.name;

		if (toolName === 'hello_mcp') {
			const name = request.params.arguments?.name ?? 'Mundo';
			return {
				content: [ { type: 'text', text: `Olá, ${name}! O servidor MCP está operando.` } ],
			};
		}

		if (toolName === 'mcp_version') {
			let metadataTimestamp: string | undefined;
			try {
				const stats = await fs.stat(`${DOCS_DIR}/.docgen/components-metadata.json`);
				metadataTimestamp = stats.mtime.toISOString();
			} catch {
				// Ignore if file doesn't exist
			}
			return {
				content: [{
					type: 'text',
					text: JSON.stringify({
						version: API_VERSION,
						minimumClientVersion: '0.0.1',
						metadataLastGenerated: metadataTimestamp,
					}, null, 2),
				}],
			};
		}

		if (componentToolNames.has(toolName)) {
			const metadata = await getMetadata();
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

		if(contributorToolNames.has(toolName)) {
			const metadata = await getMetadata();
			return await handleContributorToolCall(request as CallToolRequest, metadata);
		}

		throw new Error(`Ferramenta "${toolName}" não encontrada`);
	});

	const transport = new StdioServerTransport();
	await server.connect(transport);

	console.error('Servidor MCP rodando via STDIO');
}

main().catch((error) => {
	console.error('Erro fatal no servidor:', error);
	process.exit(1);
});