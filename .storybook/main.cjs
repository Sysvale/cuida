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
		// return the customized config
		return mergeConfig(config, {
			// customize the Vite config here
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