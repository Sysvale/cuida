export default (arr1, arr2) => {
	if (arr1.length !== arr2.length) return false;

	const sorted1 = [...arr1].sort();
	const sorted2 = [...arr2].sort();

	return sorted1.every((item, index) => item === sorted2[index]);
}