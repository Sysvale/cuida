import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [Vue()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/tests/setup.js'],
		snapshotFormat: {
			maxDepth: 2
		},
		coverage: {
			enabled: true,
			provider: 'v8',
			reportsDirectory: './coverage',
			reporter: ['text', 'lcov', 'json', 'html'],
			exclude: ['**/tests/**', '**/__tests__/**'],
		}
	},
	root: '.', //Define the root
});