import { ComponentMetadata } from '../types/index.js';
import Fuse from 'fuse.js';

export interface SearchResult {
	name: string;
	description: string;
	relevance: number;
}

export function searchComponents(query: string, metadata: Record<string, ComponentMetadata>): SearchResult[] {
	const lowerCaseQuery = query.toLowerCase();
	const results: SearchResult[] = [];

	const fuse = new Fuse(Object.values(metadata), {
		keys: ['displayName', 'description'],
		includeScore: true,
		threshold: 0.2,
	});

	fuse
		.search(lowerCaseQuery)
		.forEach((result) => {
			results.push({
				name: result.item.displayName,
				description: result.item.description || 'No description available.',
				relevance: result.score || 1,
			});
		});

	return results;
}
