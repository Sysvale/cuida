const concat = require('concat');
const createFile = require('create-file');

createFile('dist/@sysvale/tokens.scss', '', function (err) {
	console.warn(err);
});

concat(
	[
		'src/assets/sass/borders.scss',
		'src/assets/sass/colors.module.scss',
		'src/assets/sass/elevation.scss',
		'src/assets/sass/fontWeight.scss',
		'src/assets/sass/reset.scss',
		'src/assets/sass/shadows.scss',
		'src/assets/sass/spacing.scss',
		'src/assets/sass/transitions.scss',
		'src/assets/sass/typography.scss',
		'src/assets/sass/utils.scss',
	],
	'dist/@sysvale/tokens.scss'
);
