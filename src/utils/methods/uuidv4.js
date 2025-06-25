export default function generateKey() { //cria UUIDv4
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
		const random = Math.random() * 16 | 0;
		const value = char === 'x' ? random : (random & 0x3 | 0x8);
		return value.toString(16);
	});
}
