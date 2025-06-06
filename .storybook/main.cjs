const { mergeConfig } = require('vite');

module.exports = {
	"stories": [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)"
	],
	"addons": [
		'@storybook/preset-scss',
		"@storybook/addon-essentials",
	],
	"framework": "@storybook/vue3",
	"core": {
		"builder": "@storybook/builder-vite"
	},
	docs: {
		docsPage: "automatic"
	},
	async viteFinal(config, { configType }) {
		return mergeConfig(config, {
			css: {
				preprocessorOptions: {
					scss: {
						logger: {
							warn(text, options) {
								if (text.includes('[legacy-js-api]')) return;
								console.warn(text);
							},
							debug() {}
						}
					}
				}
			},
			optimizeDeps: {
				esbuildOptions: {
					target: ['es2020', 'safari14', 'chrome87', 'edge88', 'firefox78'],
				},
			},
			build: {
				target: ['es2020', 'safari14', 'chrome87', 'edge88', 'firefox78'],
			},
		});
	},
}