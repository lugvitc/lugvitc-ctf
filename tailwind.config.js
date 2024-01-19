/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

	theme: {

		extend: {
			boxShadow:{
				"custom": "0px 0px 60px 10px rgba(0, 255, 117, 0.30)"
			},
			backgroundImage:{
				landing:"url('./src/assets/images/background.svg')"},
			backgroundPosition:{
				landingPos :"left 10em top 12em"},
			dropShadow:{
				"3xl": "0 3px 3px rgba(57, 255, 20, 1)"
			},
			transitionDuration: {
				'1500': '1.5s',
			},
			colors: {
				'sky-blue': '#78CBFF',
				'midnight-blue': '#002133',
				'gray36': '#5C5C5C',
				'dark-grayish-blue': "#262626B2",
				'animation-green': '#039d00',
				"black-green": "#00640010",
				"navy-blue": "#011522",
				"flouroscent-green":"#08FF08",
			},
			fontFamily: {
				"source-code-pro": ["Source Code Pro", "monospace"],
				"DM-Mono": ["DM Mono", "monospace"],
			},
			animation: {
				"glitch-anim-text": "glitchAnimText 4s linear 4.5s infinite",
				"glitch-anim-text-2": "glitchAnimText2 4s linear 5.5s infinite",
				"btn-anim-1": "btnanim1 2s linear infinite",
			},
			keyframes: {
				glitchAnimText: {
					"0%": {
						// transform: 'translate3d(calc(-1 * var(--gap-horizontal)), 0, 0) scale3d(-1, -1, 1)',
						"-webkit-clip-path": "polygon(0 20%, 100% 20%, 100% 21%, 0 21%)",
						"clip-path": "polygon(0 20%, 100% 20%, 100% 21%, 0 21%)",
					},
					"2%": {
						"-webkit-clip-path": "polygon(0 33%, 100% 33%, 100% 33%, 0 33%)",
						"clip-path": "polygon(0 33%, 100% 33%, 100% 33%, 0 33%)",
					},
					"4%": {
						"-webkit-clip-path": "polygon(0 44%, 100% 44%, 100% 44%, 0 44%)",
						"clip-path": "polygon(0 44%, 100% 44%, 100% 44%, 0 44%)",
					},
					"5%": {
						"-webkit-clip-path": "polygon(0 50%, 100% 50%, 100% 20%, 0 20%)",
						"clip-path": "polygon(0 50%, 100% 50%, 100% 20%, 0 20%)",
					},
					"6%": {
						"-webkit-clip-path": "polygon(0 70%, 100% 70%, 100% 70%, 0 70%)",
						"clip-path": "polygon(0 70%, 100% 70%, 100% 70%, 0 70%)",
					},
					"7%": {
						"-webkit-clip-path": "polygon(0 80%, 100% 80%, 100% 80%, 0 80%)",
						"clip-path": "polygon(0 80%, 100% 80%, 100% 80%, 0 80%)",
					},
					"8%": {
						"-webkit-clip-path": "polygon(0 50%, 100% 50%, 100% 55%, 0 55%)",
						"clip-path": "polygon(0 50%, 100% 50%, 100% 55%, 0 55%)",
					},
					"9%": {
						"-webkit-clip-path": "polygon(0 70%, 100% 70%, 100% 80%, 0 80%)",
						"clip-path": "polygon(0 70%, 100% 70%, 100% 80%, 0 80%)",
					},
					"10%, 100%": {
						transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
						"-webkit-clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
						"clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
					},
				},
				glitchAnimText2: {
					"0%": {
						"-webkit-clip-path": "polygon(0 40%, 100% 20%, 100% 21%, 0 21%)",
						"clip-path": "polygon(0 40%, 100% 20%, 100% 21%, 0 21%)",
					},
					"2%": {
						"-webkit-clip-path": "polygon(0 33%, 100% 33%, 100% 73%, 0 33%)",
						"clip-path": "polygon(0 33%, 100% 33%, 100% 73%, 0 33%)",
					},
					"4%": {
						"-webkit-clip-path": "polygon(0 44%, 100% 82%, 100% 44%, 0 0%)",
						"clip-path": "polygon(0 44%, 100% 44%, 100% 82%, 0 0%)",
					},
					"5%": {
						"-webkit-clip-path": "polygon(0 50%, 100% 50%, 100% 20%, 0 20%)",
						"clip-path": "polygon(0 50%, 100% 50%, 100% 20%, 0 20%)",
					},
					"6%": {
						"-webkit-clip-path": "polygon(0 70%, 100% 70%, 100% 70%, 0 70%)",
						"clip-path": "polygon(0 70%, 100% 70%, 100% 70%, 0 70%)",
					},
					"7%": {
						"-webkit-clip-path": "polygon(0 11%, 100% 80%, 100% 80%, 0 80%)",
						"clip-path": "polygon(0 11%, 100% 80%, 100% 80%, 0 80%)",
					},
					"8%": {
						"-webkit-clip-path": "polygon(0 50%, 100% 50%, 100% 55%, 0 55%)",
						"clip-path": "polygon(0 50%, 100% 50%, 100% 55%, 0 55%)",
					},
					"9%": {
						"-webkit-clip-path": "polygon(0 70%, 20% 70%, 100% 40%, 0 80%)",
						"clip-path": "polygon(0 70%, 100% 70%, 20% 40%, 0 80%)",
					},
					"10%, 100%": {
						transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
						"-webkit-clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
						"clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
					},
				},
				btnanim1: {
					"0%": {
					  "left": "-100%"
					},

					"50%, 100%": {
					  "left": "100%"
					}
				  },
				  hackerEffect: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100%)' },
				},
			},
		},
	},
};
