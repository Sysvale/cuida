import { z } from 'zod';

export const ListComponentsInputSchema = z.object({
	category: z.string().optional(),
});

export const GetComponentMetadataInputSchema = z.object({
	name: z.string().min(1, 'Component name is required')
		.describe('The name of the component (e.g., "CdsButton").'),
});

export const GetComponentSourceInputSchema = z.object({
	name: z.string().min(1, 'Component name is required')
		.describe('The name of the component (e.g., "CdsButton").'),
});

export const GetComponentDocsInputSchema = z.object({
	name: z.string().min(1, 'Component name is required')
		.describe('The name of the component (e.g., "CdsButton").'),
});

export const SearchComponentsInputSchema = z.object({
	query: z.string().min(1, 'Query is required')
		.describe('The query to search for (e.g., "email").'),
});
