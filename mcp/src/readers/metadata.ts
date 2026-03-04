import * as fs from 'fs/promises';
import * as path from 'path';
import { ComponentMetadata } from '../types/index.js';
import { fileURLToPath } from 'node:url';

export interface SimplifiedComponent {
	name: string;
	description: string;
	category: string;
}

export async function readMetadata(): Promise<Record<string, ComponentMetadata>> {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const metadataPath = path.resolve(__dirname, '../../../docs/.docgen/components-metadata.json');
	const fileContent = await fs.readFile(metadataPath, 'utf-8');
	return JSON.parse(fileContent);
}