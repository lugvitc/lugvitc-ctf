/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

	theme: {
		extend: {
			colors: {
				'sky-blue': '#78CBFF',
				'midnight-blue': '#002133',
				'gray36': '#5C5C5C',
				'dark-grayish-blue': "#262626B2"
			},
			fontFamily: {
				'source-code-pro': ['Source Code Pro', 'monospace'],
				'DM-Mono': ['DM Mono', 'monospace']
			},
		}
	},

}