import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const colorFamilies: Record<string, string> = {
	n: 'Neutrals',
	gp: 'Piccolo Green',
	ta: 'Aquaman Teal',
	ts: 'Sulivan Turquoise',
	bn: 'Nocturne Blue',
	in: 'Nightwing Indigo',
	vr: 'Raven Violet',
	pp: 'Peppa Pink',
	rc: 'Carmen Red',
	og: 'Goku Orange',
	al: 'Lisa Amber',
};

export async function generateColorPaletteMarkdown() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const scssFilePath = path.resolve(__dirname, '../../../../../src/assets/sass/tokens/colors.module.scss');
	const scssContent = await fs.readFile(scssFilePath, 'utf-8');

	const tokenRegex = /\$([a-zA-Z]+)-(\d+):\s*(#[a-fA-F0-9]{3,6});/g;

	const palette: Record<string, { shade: number; hex: string; token: string }[]> = {};
	let match;

	while ((match = tokenRegex.exec(scssContent)) !== null) {
		const prefix = match[1];
		const shade = parseInt(match[2], 10);
		const hex = match[3];
		const token = `$${prefix}-${shade}`;

		if (!colorFamilies[prefix]) continue;

		if (!palette[prefix]) {
			palette[prefix] = [];
		}

		palette[prefix].push({ shade, hex, token });
	}

	let markdown = `# Cuida Design System - Color Tokens\n\n`;
	markdown += `Utilize estritamente os tokens SCSS abaixo para cores. Não use hexadecimais puros. O base é o shade 500.\n\n`;

	for (const [prefix, tokens] of Object.entries(palette)) {
		const familyName = colorFamilies[prefix];
		
		tokens.sort((a, b) => a.shade - b.shade);

		markdown += `### ${familyName} (${prefix})\n`;
		markdown += `| Shade | Hexadecimal | Token SCSS |\n`;
		markdown += `|-------|-------------|------------|\n`;

		for (const { shade, hex, token } of tokens) {
			markdown += `| ${shade} | \`${hex.toUpperCase()}\` | \`${token}\` |\n`;
		}
		markdown += `\n`;
	}

	markdown += `### Background Gradients\n`;
	markdown += `- Principal: \`linear-gradient($bg-gradient)\`\n`;

	return markdown;
}