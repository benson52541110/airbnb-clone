/** @type {import('tailwindcss').Config} */
export default {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	content: [],
	theme: {
		extend: {
			backgroundColor: {
				primary: "#FF385C",
			},
			textColor: {
				primary: "#FF385C",
			},
			screens: {
				sm: "550px",
				lg: "950px",
				md: "744px",
				xl: "1128px",
			},
		},
	},
	plugins: [],
	variants: {
		extend: {
			borderColor: ["active"],
			textColor: ["active"],
		},
	},
};
