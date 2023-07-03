const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;
const GAMMA = 2.4;

const PARAMETER = {
	POOR: 3,
	GOOD: 4.5,
	VERYGOOD: 7,
	SUPER: 12,
}

import hexToRgb from './hexToRgb.js';

export default (color1, color2, parameter = 'GOOD') => {
	let color1RGB = hexToRgb(color1);
	let color2RGB = hexToRgb(color2);

	var lum1 = luminance(...color1RGB);
	var lum2 = luminance(...color2RGB);
	var brightest = Math.max(lum1, lum2);
	var darkest = Math.min(lum1, lum2);

	return ((brightest + 0.05) / (darkest + 0.05)) >= PARAMETER[parameter];
};

function luminance(r, g, b) {
	var a = [r, g, b].map((v) => {
		v /= 255;
		return v <= 0.03928
			? v / 12.92
			: Math.pow((v + 0.055) / 1.055, GAMMA);
	});

	return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}
