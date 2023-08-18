const { readFileSync } = require( 'fs' );
const { loadCsf } = require( '@storybook/csf-tools' );

module.exports = {
	stories: [
		// WooCommerce Blocks stuff (anywhere in repo!)
		'../assets/js/**/stories/*.@(jsx|tsx)',
		'../packages/**/stories/*.@(jsx|tsx)',
	],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
		'@storybook/addon-links',
		'storybook-addon-react-docgen',
		'@storybook/addon-styling',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	features: {
		babelModeV7: true,
		emotionAlias: false,
	},
	docs: {
		autodocs: 'tag',
	},
	storyIndexers: ( indexers ) => {
		const indexer = async ( fileName, opts ) => {
			const code = readFileSync( fileName, { encoding: 'utf-8' } );
			return loadCsf( code, { ...opts, fileName } ).parse();
		};

		return [
			{
				test: /stories\/(.+).tsx$/,
				indexer,
			},
			...( indexers || [] ),
		];
	},
	// webpackFinal field was added in following PR: https://github.com/woocommerce/woocommerce-blocks/pull/7514
	// This fixes "storybook build issue" related to framer-motion library.
	// Solution is from this commment: https://github.com/storybookjs/storybook/issues/16690#issuecomment-971579785
	webpackFinal: async ( config ) => {
		config.module.rules.push( {
			test: /\.mjs$/,
			include: /node_modules/,
			type: 'javascript/auto',
		} );
		return config;
	},
};
