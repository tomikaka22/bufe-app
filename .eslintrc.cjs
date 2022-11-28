module.exports = {
	'env': {
		'browser': true,
		'es2017': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
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
		]
	}
};
