export default function hasSameItems(arr1: string[], arr2: string[]): boolean {
	if (arr1.length !== arr2.length) return false;
	if (arr1.length === 0 && arr2.length === 0) return true;

	const sorted1 = [...arr1].sort();
	const sorted2 = [...arr2].sort();

	return sorted1.every((item, index) => item === sorted2[index]);
}