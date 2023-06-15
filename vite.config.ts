import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import typescript from '@rollup/plugin-typescript';

import { fileURLToPath, URL } from "url";

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		modules: {
			scopeBehaviour: 'global',
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			target: ['es2020', 'safari14', 'chrome87', 'edge88', 'firefox78'],
		},
	},
	build: {
		target: ['es2020', 'safari14', 'chrome87', 'edge88', 'firefox78'],
		lib: {
			entry: path.resolve(__dirname, './src/components/index.ts'),
			name: '@sysvale/cuida',
			// the proper extensions will be added
			fileName: (format) => `@sysvale/cuida.${format}.js`,
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ['vue'],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: 'Vue'
				},
			},
		},
	},
	plugins: [
		{
			...typescript({ tsconfig: './tsconfig.json' }),
			apply: 'build',
			declaration: true,
			declarationDir: 'types/',
			rootDir: '/'
		},
		vue(),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
})
