import * as fs from 'fs/promises';
import * as path from 'path';

export async function readSourceFile(filePath: string): Promise<string> {
	const absolutePath = path.resolve(process.cwd(), '..', filePath);
	return await fs.readFile(absolutePath, 'utf-8');
}
