import hasSameItems from '../utils/methods/hasSameItems';
import { describe, it, expect } from 'vitest';

describe('hasSameItems', () => {
	it('should return true when arrays have same items regardless of order', () => {
		const arr1: string[] = ['a', 'b', 'c'];
		const arr2: string[] = ['c', 'a', 'b'];
		expect(hasSameItems(arr1, arr2)).toBe(true);
	});

	it('should return false when arrays have different items', () => {
		const arr1: string[] = ['a', 'b', 'c'];
		const arr2: string[] = ['a', 'b', 'd'];
		expect(hasSameItems(arr1, arr2)).toBe(false);
	});

	it('should return false when arrays have different lengths', () => {
		const arr1: string[] = ['a', 'b', 'c'];
		const arr2: string[] = ['a', 'b'];
		expect(hasSameItems(arr1, arr2)).toBe(false);
	});

	it('should handle arrays with duplicate values', () => {
		const arr1: string[] = ['a', 'b', 'b', 'c'];
		const arr2: string[] = ['b', 'a', 'c', 'b'];
		expect(hasSameItems(arr1, arr2)).toBe(true);
	});

	it('should return true for empty arrays', () => {
		const arr1: string[] = [];
		const arr2: string[] = [];
		expect(hasSameItems(arr1, arr2)).toBe(true);
	});
});
