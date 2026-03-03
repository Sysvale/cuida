import { describe, it, expect, vi, beforeAll } from 'vitest';
import { CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const mockRequestHandlers = new Map<any, () => Promise<any>>();

vi.mock('@modelcontextprotocol/sdk/server/index.js', () => {
	const MockServer = class {
		constructor() {
			return {
				setRequestHandler: vi.fn((schema, handler) => {
					mockRequestHandlers.set(schema, handler);
				}),
				connect: vi.fn().mockResolvedValue(undefined),
			};
		}
	};
	return { Server: MockServer };
});

vi.mock('../../readers/metadata.js', () => ({
	readMetadata: vi.fn().mockResolvedValue({}),
}));
vi.mock('../../readers/docs.js', () => ({
	indexDocs: vi.fn().mockResolvedValue(new Map()),
}));
vi.mock('../../readers/tokens.js', () => ({
	listTokenFiles: vi.fn().mockResolvedValue([]),
	readTokenFile: vi.fn().mockResolvedValue(''),
}));


import { main } from '../index.js';

describe('Server Index', () => {
	beforeAll(async () => {
		mockRequestHandlers.clear();
		await main();
	});

	describe('hello_mcp tool', () => {
		let handler: ((request: any) => Promise<any>) | undefined;

		beforeAll(() => {
			handler = mockRequestHandlers.get(CallToolRequestSchema);
		});

		it('should have registered a handler for tool calls', () => {
			expect(handler).toBeDefined();
			expect(typeof handler).toBe('function');
		});
		
		it('should return the default hello message', async () => {
			if (!handler) throw new Error('Handler not registered');
			const request = { params: { name: 'hello_mcp', arguments: {} } };
			const result = await handler(request);
			expect(result.content[0].text).toContain('Olá, Mundo!');
		});

		it('should return a personalized hello message', async () => {
			if (!handler) throw new Error('Handler not registered');
			const request = { params: { name: 'hello_mcp', arguments: { name: 'Vitest' } } };
			const result = await handler(request);
			expect(result.content[0].text).toContain('Olá, Vitest!');
		});

		it('should throw an error for an unknown tool', async () => {
			if (!handler) throw new Error('Handler not registered');
			const request = { params: { name: 'unknown_tool', arguments: {} } };
			await expect(handler(request)).rejects.toThrow('Ferramenta "unknown_tool" não encontrada');
		});
	});
});
