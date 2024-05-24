export default (rawPalete) => {
	let palete = [];
	let colorSwatch = {};

	const regexp = /(\[[^[\]]*\])/g;
	const matches = rawPalete.match(regexp);

	for (let i = 0; i < matches.length; i++){
		matches[i] = matches[i].replace('[', '');
		matches[i] = matches[i].replace(']', '');

		let properties = matches[i].split(',');

		colorSwatch.colorName = properties[0].trim().replace(/"/g,'');
		colorSwatch.variantName = properties[1].trim().replace(/"/g,'');
		colorSwatch.color400 = properties[6];
		colorSwatch.colorShades = [];
		colorSwatch.colorTokens = [];
		colorSwatch.colorData = [];

		let enteredTokensSection = false;

		//NOTE: O idx3 é usado para retornar às primeiras posições do array para colocar na mesma posição
		// valores HEX e os tokens 
		for (let idx2 = 2, idx3 = 2; idx2 < properties.length; idx2++, idx3++) {
			if (properties[idx2].includes('#')) {
				colorSwatch.colorShades.push(properties[idx2].trim());

				colorSwatch.colorData[idx3 - 2] = {};
				colorSwatch.colorData[idx3 - 2].shade = properties[idx2].trim();
			//NOTE: Entra no if abaixo quando o array de cores termina e começa o array de tokens
			} else if (properties[idx2].includes('$')) {
				colorSwatch.colorTokens.push(properties[idx2].trim().replace(/"/g,''));
				colorSwatch.colorData[idx3 - 2].token = properties[idx2].trim().replace(/"/g,'');
			}

			if (!enteredTokensSection && properties[idx2 + 1].includes('$')) {
				idx3 = 1;
				enteredTokensSection = true;
			}
		}

		palete.push(colorSwatch);
		colorSwatch = {};
	}

	return palete;
}
