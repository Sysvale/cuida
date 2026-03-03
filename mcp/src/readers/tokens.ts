import * as fs from 'fs/promises';
import * as path from 'path';

const tokensDir = path.join(process.cwd(), '../src/assets/sass/tokens');

export async function listTokenFiles(): Promise<string[]> {
	const files = await fs.readdir(tokensDir);
	return files.map(file => path.basename(file, '.scss').replace(/^_/, ''));
}

export async function readTokenFile(filename: string): Promise<string> {
	const potentialFilenames = [`_${filename}.scss`, `${filename}.scss`];
	for (const name of potentialFilenames) {
		try {
			const filePath = path.join(tokensDir, name);
			return await fs.readFile(filePath, 'utf-8');
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
				throw error;
			}
		}
	}
	throw new Error(`Token file "${filename}" not found.`);
}
