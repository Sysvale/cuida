import { ComponentMetadata } from '../../../types/index.js';
import { searchComponents } from '../../../indexer/search.js';
import Fuse from 'fuse.js';

export const findComponent = (name: string, metadata: Record<string, ComponentMetadata>) => {
	const [component] = searchComponents(name, metadata);
	if (!component) {
		const componentNames = Object.keys(metadata);
		const fuse = new Fuse(componentNames, { threshold: 0.3 });
		const suggestions = fuse.search(name).map(r => r.item).slice(0, 3);
		const suggestionText = suggestions.length > 0
			? `. Did you mean: ${suggestions.join(', ')}?`
			: '';
		return { success: false as const, error: new Error(`Component "${name}" not found.${suggestionText}`) };
	}
	return { success: true as const, data: component };
};
