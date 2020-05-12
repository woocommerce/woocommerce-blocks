/**
 * External dependencies
 */
const path = require( 'path' );
const { kebabCase } = require( 'lodash' );
const { DefinePlugin } = require( 'webpack' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CreateFileWebpack = require( 'create-file-webpack' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const chalk = require( 'chalk' );
const NODE_ENV = process.env.NODE_ENV || 'development';
const FORCE_MAP = process.env.FORCE_MAP || false;
const FallbackModuleDirectoryPlugin = require( './bin/fallback-module-directory-webpack-plugin' );
const {
	getAlias,
	getMainConfig,
	getFrontConfig,
	getPaymentMethodsExtensionConfig,
} = require( './bin/webpack-helpers.js' );

const baseConfig = {
	mode: NODE_ENV,
	performance: {
		hints: false,
	},
	stats: {
		all: false,
		assets: true,
		builtAt: true,
		colors: true,
		errors: true,
		hash: true,
		timings: true,
	},
	watchOptions: {
		ignored: /node_modules/,
	},
	devtool: NODE_ENV === 'development' || FORCE_MAP ? 'source-map' : false,
};

const CoreConfig = {
	...baseConfig,
	entry: {
		wcBlocksRegistry: './assets/js/blocks-registry/index.js',
		wcSettings: './assets/js/settings/shared/index.js',
		wcBlocksData: './assets/js/data/index.js',
		wcBlocksMiddleware: './assets/js/middleware/index.js',
	},
	output: {
		filename: ( chunkData ) => {
			return `${ kebabCase( chunkData.chunk.name ) }.js`;
		},
		path: path.resolve( __dirname, './build/' ),
		library: [ 'wc', '[name]' ],
		libraryTarget: 'this',
		// This fixes an issue with multiple webpack projects using chunking
		// overwriting each other's chunk loader function.
		// See https://webpack.js.org/configuration/output/#outputjsonpfunction
		jsonpFunction: 'webpackWcBlocksJsonp',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader?cacheDirectory',
					options: {
						presets: [ '@wordpress/babel-preset-default' ],
						plugins: [
							require.resolve(
								'@babel/plugin-proposal-class-properties'
							),
						].filter( Boolean ),
					},
				},
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new ProgressBarPlugin( {
			format:
				chalk.blue( 'Build core script' ) +
				' [:bar] ' +
				chalk.green( ':percent' ) +
				' :msg (:elapsed seconds)',
		} ),
		new DependencyExtractionWebpackPlugin( { injectPolyfill: true } ),
		new DefinePlugin( {
			// Inject the `WOOCOMMERCE_BLOCKS_PHASE` global, used for feature flagging.
			'process.env.WOOCOMMERCE_BLOCKS_PHASE': JSON.stringify(
				// eslint-disable-next-line woocommerce/feature-flag
				process.env.WOOCOMMERCE_BLOCKS_PHASE || 'experimental'
			),
		} ),
		new CreateFileWebpack( {
			path: './',
			// file name
			fileName: 'blocks.ini',
			// content of the file
			content: `woocommerce_blocks_phase = ${
				// eslint-disable-next-line woocommerce/feature-flag
				process.env.WOOCOMMERCE_BLOCKS_PHASE || 'experimental'
			}`,
		} ),
	],
};

const GutenbergBlocksConfig = {
	...baseConfig,
	...getMainConfig( {
		alias: getAlias(),
		// This file is already imported by the All Products dependencies,
		// so we can safely exclude it from the default build. It's still
		// needed in the legacy build because it doesn't include the
		// All Products block.
		exclude: [ 'product-list-style' ],
	} ),
};

const BlocksFrontendConfig = {
	...baseConfig,
	...getFrontConfig( { alias: getAlias() } ),
};

/**
 * Currently Legacy Configs are for builds targeting < WP5.3
 */

// eslint-disable-next-line no-unused-vars
const LegacyBlocksConfig = {
	...baseConfig,
	...getMainConfig( {
		fileSuffix: 'legacy',
		resolvePlugins: [
			new FallbackModuleDirectoryPlugin(
				'/legacy/',
				'/',
				getAlias( { pathPart: 'legacy' } )
			),
		],
		exclude: [
			'all-products',
			'price-filter',
			'attribute-filter',
			'active-filters',
			'checkout',
			'cart',
			'single-product',
		],
	} ),
};

// eslint-disable-next-line no-unused-vars
const LegacyFrontendBlocksConfig = {
	...baseConfig,
	...getFrontConfig( {
		fileSuffix: 'legacy',
		resolvePlugins: [
			new FallbackModuleDirectoryPlugin(
				'/legacy/',
				'/',
				getAlias( { pathPart: 'legacy' } )
			),
		],
		exclude: [
			'all-products',
			'price-filter',
			'attribute-filter',
			'active-filters',
			'checkout',
			'cart',
			'single-product',
		],
	} ),
};

/**
 * This is a temporary config for building the payment methods integration
 * script until it can be moved into the payment extension(s).
 */
const PaymentMethodsConfig = {
	...baseConfig,
	...getPaymentMethodsExtensionConfig( { alias: getAlias() } ),
};

module.exports = [
	CoreConfig,
	GutenbergBlocksConfig,
	BlocksFrontendConfig,
	LegacyBlocksConfig,
	LegacyFrontendBlocksConfig,
	PaymentMethodsConfig,
];
