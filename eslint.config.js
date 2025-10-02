import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
	js.configs.recommended,
	...vue.configs['flat/recommended'],
	...vue.configs['flat/strongly-recommended'],
	{
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser,
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				...globals.node,
				...globals.browser,
			},
		},
	},
	{
		files: ['**/*.{js,mjs,ts}'],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.node,
			},
		},
	},
	{
		rules: {
			'vue/html-indent': [
				'error',
				'tab',
				{
					attribute: 1,
					closeBracket: 0,
					alignAttributesVertically: true,
					ignores: [],
				},
			],
			'vue/require-explicit-emits': 'off',
			'no-tabs': 'off',
			indent: [
				'error',
				'tab',
				{
					SwitchCase: 1,
				},
			],
			quotes: [
				'error',
				'single',
				{
					allowTemplateLiterals: true,
				},
			],
			'no-extra-semi': 'off',
		},
	},
];
