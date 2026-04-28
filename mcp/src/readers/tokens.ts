import * as fs from 'fs/promises';
import * as path from 'path';
import { SRC_DIR } from '../utils/paths';

const tokensDir = path.join(`${SRC_DIR}/assets/sass/tokens`);

const tokenCache = new Map<string, { content: string; timestamp: number }>();
const CACHE_TTL = 60000;

export async function listTokenFiles(): Promise<string[]> {
	const files = await fs.readdir(tokensDir);
	return files.map(file => path.basename(file, '.scss').replace(/^_/, ''));
}

export async function readTokenFile(filename: string): Promise<string> {
	const cached = tokenCache.get(filename);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		return cached.content;
	}
	
	const potentialFilenames = [`_${filename}.scss`, `${filename}.scss`];
	for (const name of potentialFilenames) {
		try {
			const filePath = path.join(tokensDir, name);
			const content = await fs.readFile(filePath, 'utf-8');
			tokenCache.set(filename, { content, timestamp: Date.now() });
			return content;
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
				throw error;
			}
		}
	}
	throw new Error(`Token file "${filename}" not found.`);
}
