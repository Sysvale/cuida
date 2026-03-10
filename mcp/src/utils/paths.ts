import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.join(__dirname, '..', '..', '..');
export const SRC_DIR = path.join(ROOT_DIR, 'src');
export const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
export const DOCS_DIR = path.join(ROOT_DIR, 'docs');
export const VITEPRESS_DIST_DIR = path.join(DOCS_DIR, '.vitepress', 'dist');