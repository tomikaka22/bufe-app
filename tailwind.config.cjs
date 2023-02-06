/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
	  extend: {
		fontFamily: {
		  sofia : ['Sofia sans', 'sans serif']
		},
		fontWeight: {
		  extrablack : "900"
		}
	  }
	},
	plugins: [],
}  