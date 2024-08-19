import globals from 'globals';
import pluginJs from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';

export default [
	{
		languageOptions: { globals: globals.node },
	},
	pluginJs.configs.recommended,
	{
		files: ['**/*.test.js'], 
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
		},
		plugins: {
			jest: jestPlugin,
		},
		rules: {
			...jestPlugin.configs.recommended.rules,
		},
	},
];
