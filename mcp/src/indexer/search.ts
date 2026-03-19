import { ComponentMetadata } from '../types/index.js';
import Fuse from 'fuse.js';

export function searchComponents(query: string, metadata: Record<string, ComponentMetadata>): ComponentMetadata[] {
	const lowerCaseQuery = query.toLowerCase();

	const fuse = new Fuse(Object.values(metadata), {
		keys: ['displayName', 'description', 'name'],
		includeScore: true,
		threshold: 0.2,
	});

	return fuse.search(lowerCaseQuery)
		.map((result) => ({
			...result.item,
			description: result.item.description || 'No description available.',
			searchRelevance: result.score || 1,
		}));
}
