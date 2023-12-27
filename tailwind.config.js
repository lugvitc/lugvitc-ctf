/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],

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