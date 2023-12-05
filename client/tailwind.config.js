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
				sm: "576px",
				md: "768px",
				lg: "992px",
				xl: "1200px",
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
