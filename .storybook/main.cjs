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
	features: {
		storyStoreV7: true,
		buildStoriesJson: true,
		modernInlineRender: false,
	},
	docs: {
		docsPage: "automatic"
	}
}