import { ComponentMetadata } from '../../../types/index.js';
import { searchComponents } from '../../../indexer/search.js';

export const findComponent = (name: string, metadata: Record<string, ComponentMetadata>) => {
	const [component] = searchComponents(name, metadata);
	if (!component) {
		return { success: false as const, error: new Error(`Component "${name}" not found.`) };
	}
	return { success: true as const, data: component };
};
