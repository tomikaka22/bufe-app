module.exports = {
	'env': {
		'browser': true,
		'es2020': true,
		'node': true,
		'worker': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:svelte/recommended'
	],
	'overrides': [
		{
			files: [ '*.svelte' ],
			parser: 'svelte-eslint-parser'
		}
	],
	'parserOptions': {
		'ecmaVersion': '2020',
		'sourceType': 'module'
	},
	'rules': {
		'no-unused-vars': [
			'warn'
		],
		'indent': [
			'warn',
			'tab',
			{ 'SwitchCase': 1 }
		],
		'linebreak-style': [
			'warn',
			'unix'
		],
		'quotes': [
			'warn',
			'single'
		],
		'semi': [
			'warn',
			'always'
		],
		'comma-dangle': [
			'warn', 'never'
		],
		'object-curly-spacing': [
			'warn', 'always'
		],
		'no-trailing-spaces': [
			'warn'
		],
		'arrow-spacing': [
			'warn'
		],
		'array-bracket-spacing': [
			'warn', 'always'
		],
		'sort-imports': [
			'warn', { 'ignoreDeclarationSort': true }
		],
		'prefer-const': [
			'warn'
		],
		'operator-assignment': [
			'warn'
		],
		'object-shorthand': [
			'warn'
		],
		'no-useless-return': [
			'warn'
		],
		'no-var': [
			'warn'
		],
		'no-unneeded-ternary': [
			'warn'
		],
		'func-style': [
			'warn', 'declaration'
		],
		'eqeqeq': [
			'warn', 'smart'
		],
		'camelcase': [
			'warn'
		],
		'no-self-assign': [
			'off'
		],
		'svelte/valid-compile': [
			'error',
			{
				'ignoreWarnings': true
			}
		],
		'svelte/no-at-html-tags': [
			'warn'
		]
	},
	'plugins': [
	]
};
