/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],

	theme: {
		extend: {
			fontFamily: {
				'source-code-pro': ['Source Code Pro', 'monospace'],
				'DM-Mono': ['DM Mono', 'monospace']
			},
		}
	},

}