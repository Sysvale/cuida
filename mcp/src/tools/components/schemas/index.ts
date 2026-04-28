import { z } from 'zod';

export const CATEGORIES = [
	'charts', 'containers', 'display', 'estrutural', 'forms', 
	'loaders', 'navegação', 'notificação', 'overlays', 'tipografia', 'utils'
] as const;

export const ListComponentsInputSchema = z.object({
	category: z.enum(CATEGORIES)
		.optional()
		.describe('Optional category to filter components (e.g., "forms", "display").'),
});

export const GetComponentMetadataInputSchema = z.object({
	name: z.string()
		.min(1, 'Component name is required')
		.describe('The display name of the component (e.g., "CdsButton", "CdsModal").'),
});

export const GetComponentSourceInputSchema = z.object({
	name: z.string()
		.min(1, 'Component name is required')
		.describe('The display name of the component (e.g., "CdsButton").'),
});

export const GetComponentDocsInputSchema = z.object({
	name: z.string()
		.min(1, 'Component name is required')
		.describe('The display name of the component (e.g., "CdsButton").'),
});

export const SearchComponentsInputSchema = z.object({
	query: z.string()
		.min(1, 'Query is required')
		.describe('The search query to find components (e.g., "button", "modal", "input").'),
});
