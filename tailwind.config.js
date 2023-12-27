/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

	theme: {
		colors: {
			'sky-blue': '#78CBFF',
			'midnight-blue': '#002133',
		},
		extend: {
			fontFamily: {
				'source-code-pro': ['Source Code Pro', 'monospace'],
				'DM-Mono': ['DM Mono', 'monospace']
			},
		}
	},

}