import { glob } from 'glob';
import * as path from 'path';
import * as fs from 'fs/promises';
import TurndownService from 'turndown';
import { load, Cheerio } from 'cheerio';
import { logger } from '../utils/logger.js';
import { VITEPRESS_DIST_DIR } from '../utils/paths.js';

export type DocsIndex = Map<string, string>;

export async function indexDocs(): Promise<DocsIndex> {
	const docsDir = path.resolve(`${VITEPRESS_DIST_DIR}/components`);
	logger.info('Indexing docs...', { docsDir });
	const files = await glob('**/*.html', { cwd: docsDir, nodir: true, absolute: true });
	
	const index: DocsIndex = new Map();
	for (const file of files) {
		const fileName = path.basename(file, '.html').toLowerCase();
		index.set(fileName, file);
	}
	logger.info('Docs indexed.', { count: index.size, indexKeys: Array.from(index.keys()), indexValues: Array.from(index.values()) });
	return index;
}

export async function readDocFile(filePath: string, transform?: (virtualDom: Cheerio<any>) => void): Promise<string> {
	const fullHtmlString = await fs.readFile(filePath, 'utf-8');
	const $ = load(fullHtmlString);
	const $content = $('main > div > div');
	
	if ($content.length === 0) {
		console.warn('Selector "main > div > div" not found in HTML.');
		return '# Not found';
	}

	if (transform) {
		transform($content);
	}

	$content.find('.header-anchor').remove();
	$content.find('.grid-background').remove();

	const $previewHeading = $content.find(':header').filter((_, el) => {
		const text = $(el).text().toLowerCase().trim();
		const id = $(el).attr('id') || '';
		return text === 'preview' || id === 'preview';
	});

	if ($previewHeading.length > 0) {
		$previewHeading.nextUntil('h1, h2, h3, hr').remove();
		$previewHeading.remove();
	}

	const cellTurndown = new TurndownService();
	
	cellTurndown.addRule('inline-code', {
		filter: ['code', 'kbd', 'samp'],
		replacement: function(content) {
			return ' `' + content.trim() + '` ';
		}
	});

	const savedTables: Record<string, string> = {};

	$content.find('table').each((index, tableEl) => {
		let markdownTable = '\n\n';
		
		$(tableEl).find('tr').each((rowIndex, trEl) => {
			let rowText = '|';
			let divider = '|';
			
			$(trEl).find('th, td').each((_, cellEl) => {
				const rawCellHtml = $(cellEl).html() || '';
				let cellContent = cellTurndown.turndown(rawCellHtml);
				
				cellContent = cellContent.replace(/\n|\r/g, ' ');
				cellContent = cellContent.replace(/\|/g, '\\|');
				cellContent = cellContent.replace(/\\`/g, '`');
				cellContent = cellContent.replace(/\s{2,}/g, ' ');
				
				rowText += ` ${cellContent.trim()} |`;
				divider += ' --- |';
			});
			
			markdownTable += `${rowText}\n`;
			
			if (rowIndex === 0) {
				markdownTable += `${divider}\n`;
			}
		});
		
		markdownTable += '\n';
		
		const placeholder = `MAGICPLACEHOLDERTABLE${index}`;
		savedTables[placeholder] = markdownTable;
		$(tableEl).replaceWith(`<p>${placeholder}</p>`);
	});

	$content.find('script, style, svg').remove();

	const extractedHtml = $content.html() || '';

	const turndownService = new TurndownService({
		headingStyle: 'atx',
		codeBlockStyle: 'fenced'
	});
	
	let finalMarkdown = turndownService.turndown(extractedHtml); 

	for (const [placeholder, tableMarkdown] of Object.entries(savedTables)) {
		finalMarkdown = finalMarkdown.replace(placeholder, tableMarkdown);
	}

	finalMarkdown = finalMarkdown.replace(/(\*\s*\*\s*\*[\s\n]*){2,}/g, '* * *\n\n');

	return finalMarkdown.trim();
}