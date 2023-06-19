export default function removeAccents(str = '') {
	const accents =
		'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
	const accentsOut =
		'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
	const strLen = str.length;
	let newStr = str.split('');
	let x;

	for (let i = 0; i < strLen; i += 1) {
		x = accents.indexOf(str[i]);
		if (x !== -1) {
			newStr[i] = accentsOut[x];
		}
	}

	newStr = newStr.join('');
	newStr = newStr.split('.').join('');
	newStr = newStr.split('-').join('');
	newStr = newStr.split('/').join('');

	return newStr;
}
