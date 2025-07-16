const concat = require('concat');
const createFile = require('create-file');

createFile('dist/@sysvale/tokens.scss', '', function (err) {
	console.warn(err);
});

concat(
	[
		'src/assets/sass/legacy-tokens/borders.scss',
		'src/assets/sass/legacy-tokens/colors.module.scss',
		'src/assets/sass/legacy-tokens/elevation.scss',
		'src/assets/sass/legacy-tokens/fontWeight.scss',
		'src/assets/sass/legacy-tokens/reset.scss',
		'src/assets/sass/legacy-tokens/shadows.scss',
		'src/assets/sass/legacy-tokens/spacing.scss',
		'src/assets/sass/legacy-tokens/transitions.scss',
		'src/assets/sass/legacy-tokens/typography.scss',
		'src/assets/sass/legacy-tokens/utils.scss',
	],
	'dist/@sysvale/tokens.scss'
);
