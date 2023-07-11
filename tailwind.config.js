module.exports = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/helpers/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: theme => ({
				...theme.colors,
				black: {
					DEFAULT: '#030303',
				},
				gray: {
					DEFAULT: '#A4A4A4',
					light: '#313131',
					dark: '#1A1A1A',
				},
				white: '#FDFCFF',
			}),
		},
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class', // only generate classes
		}),
	],
};
