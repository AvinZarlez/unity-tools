// @ts-check
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
		},
		rules: {
			'curly': 'warn',
			'eqeqeq': 'warn',
			'no-throw-literal': 'warn',
			'no-unused-expressions': 'warn',
			'no-redeclare': 'warn',
			'semi': ['warn', 'always'],
			'@typescript-eslint/naming-convention': [
				'warn',
				{ selector: 'class', format: ['PascalCase'] },
			],
		},
	},
];
