import { vi } from 'vitest';

const fixedUuid = 'fixed-uuid';

vi.mock('@/utils/methods/uuidv4', () => ({
	default: vi.fn(() => fixedUuid)
}));

vi.mock('../utils/methods/uuidv4', () => ({
	default: vi.fn(() => fixedUuid)
}));

vi.mock('@/utils/constants/generateKey', () => ({
	default: vi.fn(() => fixedUuid)
}));

vi.mock('../utils/constants/generateKey', () => ({
	default: vi.fn(() => fixedUuid)
}));

vi.mock('@/utils', () => ({
	generateKey: vi.fn(() => fixedUuid),
	KeyCodes: {},
	sizes: {},
	widths: {},
}));
