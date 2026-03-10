import * as fs from 'fs/promises';
import * as path from 'path';
import { ROOT_DIR } from '../utils/paths';

export async function readSourceFile(filePath: string): Promise<string> {
	const absolutePath = path.resolve(ROOT_DIR, filePath);
	return await fs.readFile(absolutePath, 'utf-8');
}
