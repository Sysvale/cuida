import { vi } from 'vitest';

export const mockRequestHandlers = new Map();

export const Server = vi.fn().mockImplementation(() => {
	return {
		setRequestHandler: vi.fn((schema, handler) => {
			mockRequestHandlers.set(schema, handler);
		}),
		connect: vi.fn().mockResolvedValue(undefined),
	};
});
