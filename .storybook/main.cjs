const { mergeConfig } = require('vite');

module.exports = {
    "stories": ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

    "addons": [
        '@storybook/preset-scss',
        "@storybook/addon-essentials",
        '@storybook/addon-mdx-gfm',
        '@chromatic-com/storybook'
    ],

    "framework": {
        name: '@storybook/vue3-vite',
        options: {}
    },

    docs: {},

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
	}
}