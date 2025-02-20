import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				wormholeBg: "#0F0F0F",
				wormholeCard: "#1A1A1A",
				wormholePrimary: "#A892FF",
				wormholeText: "#E5E5E5",
			},
			animation: {
				neonGlow: "neon 2s infinite alternate ease-in-out",
			},
			keyframes: {
				neon: {
					"0%": { filter: "drop-shadow(0 0 5px #A892FF)" },
					"100%": { filter: "drop-shadow(0 0 20px #A892FF)" },
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
