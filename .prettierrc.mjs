/** @type {import("prettier").Config} */
export default {
	plugins: ['prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	trailingComma: 'all',
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	tailwindFunctions: ['clsx', 'cn', 'twMerge'],
};
