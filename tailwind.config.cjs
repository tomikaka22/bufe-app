/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
	  extend: {
		colors: {
		  blue: {
			1: "rgb(75, 177, 222)"
		  },
		  gray: {
			1: "#2b2d42",
			2: "#edf2f4"
		  },
		  red: {
			1: "#ef233c"
		  },
		  yellow: {
			1: "#f48c06"
		  }
		},
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