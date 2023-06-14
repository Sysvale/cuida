export default (rawPalete) => {
	let arr = [];
	let obj = {};

	const regexp = /(\[[^\[\]]*\])/g;
	const matches = rawPalete.match(regexp);

	for (let i = 0; i < matches.length; i++){
		matches[i] = matches[i].replace('[', '');
		matches[i] = matches[i].replace(']', '');

		let properties = matches[i].split(',');

		obj.colorName = properties[0].trim().replace(/"/g,'');
		obj.colorShades = [];
		obj.colorTokens = [];

		for (let j = 1; j < properties.length; j++) {
			if (properties[j].includes('#')) {
				obj.colorShades.push(properties[j].trim());
			} else if (properties[j].includes('$')) {
				obj.colorTokens.push(properties[j].trim().replace(/"/g,''));
			}
		}

		arr.push(obj);
		obj = {};
	}

	return arr;
}
