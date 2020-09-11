// tailwind.config.js
module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
	},
	purge: ["./**/*.html", "./**/*.vue", "./**/*.jsx", "./**/*.js"],
	plugins: [
		require("tailwindcss-dark-mode")(),
		require("@tailwindcss/ui"),
		require("@tailwindcss/ui")({
			layout: "sidebar",
		}),
		require("tailwindcss-font-inter")({
			importFontFace: true,
		}),
	],
	variants: {
		backgroundColor: [
			"dark",
			"dark-hover",
			"dark-group-hover",
			"dark-even",
			"dark-odd",
			"responsive",
			"hover",
			"focus",
			"active",
			"group-hover",
			"group-focus",
			"focus-within",
		],
		borderColor: [
			"dark",
			"dark-disabled",
			"dark-focus",
			"dark-focus-within",
			"default",
			"responsive",
			"hover",
			"focus",
			"active",
			"group-hover",
			"group-focus",
			"focus-within",
		],
		margin: ["responsive", "last"],
		textColor: [
			"dark",
			"dark-hover",
			"dark-active",
			"dark-placeholder",
			"default",
			"responsive",
			"hover",
			"focus",
			"active",
			"group-hover",
			"group-focus",
			"focus-within",
		],
	},
	theme: {
		extend: {
			zIndex: {
				0: 0,
				10: 10,
				20: 20,
				30: 30,
				40: 40,
				50: 50,
				25: 25,
				75: 75,
				100: 100,
				auto: "auto",
			},
			colors: {
				brand: "#47E0A0",
				green: {
					50: "#F2FBF8",
					100: "#E6F7F1",
					200: "#BFEBDC",
					300: "#99DEC6",
					400: "#4DC69C",
					500: "#00AD71",
					600: "#009C66",
					700: "#006844",
					800: "#004E33",
					900: "#003422",
				},
				gold: {
					50: "#FEFCF2",
					100: "#FDF9E6",
					200: "#F9F0BF",
					300: "#F5E799",
					400: "#EED54D",
					500: "#E6C300",
					600: "#CFB000",
					700: "#8A7500",
					800: "#685800",
					900: "#453B00",
				},
				dark: {
					50: "#F3F3F3",
					100: "#E7E7E7",
					200: "#C4C4C4",
					300: "#A0A0A0",
					400: "#595959",
					500: "#121212",
					600: "#101010",
					700: "#0B0B0B",
					800: "#080808",
					900: "#050505",
				},
			},
		},
	},
};
