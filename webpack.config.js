/**
 * External dependencies
 */
const path = require( 'path' );
const { kebabCase } = require( 'lodash' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const chalk = require( 'chalk' );
const BundleAnalyzerPlugin = require( '@bundle-analyzer/webpack-plugin' );
const NODE_ENV = process.env.NODE_ENV || 'development';

const bundleAnalyzerToken = process.env.BUNDLE_ANALYZER_TOKEN || '';
const FallbackModuleDirectoryPlugin = require( './bin/fallback-module-directory-webpack-plugin' );

const {
	getAlias,
	getMainConfig,
	getFrontConfig,
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
	devtool: NODE_ENV === 'development' ? 'source-map' : false,
};

// add bundleAnalyzer if the token is present
const bundleAnalyzer = bundleAnalyzerToken
	? () => [ new BundleAnalyzerPlugin( { token: bundleAnalyzerToken } ) ]
	: () => [];

const CoreConfig = {
	...baseConfig,
	entry: {
		wcBlocksRegistry: './assets/js/blocks-registry/index.js',
		wcSettings: './assets/js/settings/shared/index.js',
		wcBlocksData: './assets/js/data/index.js',
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
		...bundleAnalyzer(),
	],
};

const GutenbergBlocksConfig = {
	...baseConfig,
	...getMainConfig( {
		alias: getAlias(),
		mainPlugins: bundleAnalyzer(),
	} ),
};

const BlocksFrontendConfig = {
	...baseConfig,
	...getFrontConfig( {
		alias: getAlias(),
		mainPlugins: bundleAnalyzer(),
	} ),
};

/**
 * Currently Legacy Configs are for builds targeting < WP5.3
 */

// eslint-disable-next-line no-unused-vars
const LegacyBlocksConfig = {
	...baseConfig,
	...getMainConfig( {
		fileSuffix: 'legacy',
		mainPlugins: bundleAnalyzer(),
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
		],
	} ),
};

// eslint-disable-next-line no-unused-vars
const LegacyFrontendBlocksConfig = {
	...baseConfig,
	...getFrontConfig( {
		fileSuffix: 'legacy',
		mainPlugins: bundleAnalyzer(),
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
		],
	} ),
};

module.exports = [
	CoreConfig,
	GutenbergBlocksConfig,
	BlocksFrontendConfig,
	LegacyBlocksConfig,
	LegacyFrontendBlocksConfig,
];
