import { z } from 'zod';

export const ListTokenGroupsInputSchema = z.object({});

export const GetTokenGroupInputSchema = z.object({
	group_name: z.string()
		.min(1, 'Group name is required')
		.describe('The name of the token group (e.g., "colors", "spacing").'),
});
