/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

	theme: {

		extend: {
			transitionDuration: {
				'1500': '1.5s',
			},
			animation: {
				animateToptoBottom: 'hackerEffect 5s linear infinite'
			},
			keyframes: {
				hackerEffect: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100%)' },
				},
			},
			colors: {
				'sky-blue': '#78CBFF',
				'midnight-blue': '#002133',
				'gray36': '#5C5C5C',
				'dark-grayish-blue': "#262626B2",
				'animation-green': '#039d00',
			},
			fontFamily: {
				'source-code-pro': ['Source Code Pro', 'monospace'],
				'DM-Mono': ['DM Mono', 'monospace']
			},
		}
	},

}