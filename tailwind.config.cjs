/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ './src/**/*.{html,js,svelte,ts}' ],
	theme: {
		extend: {
			fontFamily: {
				sofia : [ 'Sofia sans', 'sans serif' ]
			},
			fontWeight: {
				extrablack : '900'
			}
		},
		colors: {
			'primary': '#ffb68f',
			'secondary': '#e6beab',
			'tertiary': '#cec891',
			'error': '#ffb4ab',
			'background': '#201a17',
			'foreground': '#2b221d',
			'outline': '#9f8d84',

			'on-primary': '#542100',
			'on-secondary': '#432b1d',
			'on-tertiary': '#343108',
			'on-error': '#690005',
			'on-background': '#ece0db',

			'primary-container': '#773200',
			'secondary-container': '#5c4132',
			'tertiary-container': '#4b481d',
			'error-container': '#93000a',
			'surface': '#201a17',
			'surface-variant': '#52443d',

			'on-primary-container': '#ffdbca',
			'on-secondary-container': '#ffdbca',
			'on-tertiary-container': '#eae5ab',
			'on-error-container': '#ffdad6',
			'on-surface': '#ece0db',
			'on-surface-variant': '#d7c2b9'

		}
	},
	plugins: []
};