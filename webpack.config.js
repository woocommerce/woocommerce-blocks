/**
 * External dependencies
 */
const path = require( 'path' );
const { kebabCase } = require( 'lodash' );
const MergeExtractFilesPlugin = require( './bin/merge-extract-files-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const chalk = require( 'chalk' );
const NODE_ENV = process.env.NODE_ENV || 'development';
const WebpackRTLPlugin = require( 'webpack-rtl-plugin' );
const FallbackModuleDirectoryPlugin = require( './bin/fallback-module-directory-webpack-plugin' );

function findModuleMatch( module, match ) {
	if ( module.request && match.test( module.request ) ) {
		return true;
	} else if ( module.issuer ) {
		return findModuleMatch( module.issuer, match );
	}
	return false;
}

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
};

const alias = {
	'@woocommerce/block-settings': path.resolve(
		__dirname,
		'assets/js/settings/blocks'
	),
	'@woocommerce/base-components': path.resolve(
		__dirname,
		'assets/js/base/components/'
	),
	'@woocommerce/base-hocs': path.resolve( __dirname, 'assets/js/base/hocs/' ),
	'@woocommerce/block-components': path.resolve(
		__dirname,
		'assets/js/components/'
	),
	'@woocommerce/block-hocs': path.resolve( __dirname, 'assets/js/hocs' ),
};

const legacyAliasResolve = {
	plugins: [
		new FallbackModuleDirectoryPlugin( '/legacy/', '/', {
			...alias,
			'@woocommerce/base-components': path.resolve(
				__dirname,
				'assets/js/legacy/base/components/'
			),
			'@woocommerce/base-hocs': path.resolve(
				__dirname,
				'assets/js/legacy/base/hocs/'
			),
			'@woocommerce/block-components': path.resolve(
				__dirname,
				'assets/js/legacy/components/'
			),
			'@woocommerce/block-hocs': path.resolve(
				__dirname,
				'assets/js/legacy/hocs'
			),
		} ),
	],
};

const requestToExternal = ( request ) => {
	const wcDepMap = {
		'@woocommerce/settings': [ 'wc', 'wcSettings' ],
	};
	if ( wcDepMap[ request ] ) {
		return wcDepMap[ request ];
	}
};

const requestToHandle = ( request ) => {
	const wcHandleMap = {
		'@woocommerce/settings': 'wc-settings',
		'@woocommerce/block-settings': 'wc-settings',
	};
	if ( wcHandleMap[ request ] ) {
		return wcHandleMap[ request ];
	}
};

const CoreConfig = {
	...baseConfig,
	entry: {
		wcSettings: './assets/js/settings/shared/index.js',
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
	],
};

/**
 * Config for compiling Gutenberg blocks JS.
 */
const GutenbergBlocksConfig = {
	...baseConfig,
	entry: {
		// Shared blocks code
		blocks: './assets/js/index.js',
		// Blocks
		'handpicked-products':
			'./assets/js/blocks/handpicked-products/index.js',
		'product-best-sellers':
			'./assets/js/blocks/product-best-sellers/index.js',
		'product-category': './assets/js/blocks/product-category/index.js',
		'product-categories': './assets/js/blocks/product-categories/index.js',
		'product-new': './assets/js/blocks/product-new/index.js',
		'product-on-sale': './assets/js/blocks/product-on-sale/index.js',
		'product-top-rated': './assets/js/blocks/product-top-rated/index.js',
		'products-by-attribute':
			'./assets/js/blocks/products-by-attribute/index.js',
		'featured-product': './assets/js/blocks/featured-product/index.js',
		'all-reviews': './assets/js/blocks/reviews/all-reviews/index.js',
		'reviews-by-product':
			'./assets/js/blocks/reviews/reviews-by-product/index.js',
		'reviews-by-category':
			'./assets/js/blocks/reviews/reviews-by-category/index.js',
		'product-search': './assets/js/blocks/product-search/index.js',
		'product-tag': './assets/js/blocks/product-tag/index.js',
		'featured-category': './assets/js/blocks/featured-category/index.js',
	},
	output: {
		path: path.resolve( __dirname, './build/' ),
		filename: '[name].js',
		library: [ 'wc', 'blocks', '[name]' ],
		libraryTarget: 'this',
		// This fixes an issue with multiple webpack projects using chunking
		// overwriting each other's chunk loader function.
		// See https://webpack.js.org/configuration/output/#outputjsonpfunction
		jsonpFunction: 'webpackWcBlocksJsonp',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					enforce: true,
				},
				editor: {
					// Capture all `editor` stylesheets and the components stylesheets.
					test: ( module = {} ) =>
						module.constructor.name === 'CssModule' &&
						( findModuleMatch( module, /editor\.scss$/ ) ||
							findModuleMatch(
								module,
								/[\\/]assets[\\/]components[\\/]/
							) ),
					name: 'editor',
					chunks: 'all',
					priority: 10,
				},
				style: {
					test: /style\.scss$/,
					name: 'style',
					chunks: 'all',
					priority: 5,
				},
			},
		},
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
							NODE_ENV === 'production'
								? require.resolve(
										'babel-plugin-transform-react-remove-prop-types'
								  )
								: false,
							require.resolve(
								'@babel/plugin-proposal-class-properties'
							),
						].filter( Boolean ),
					},
				},
			},
			{
				test: /\.s[c|a]ss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader',
					{
						loader: 'sass-loader',
						query: {
							includePaths: [ 'assets/css/abstracts' ],
							data:
								'@import "_colors"; ' +
								'@import "_variables"; ' +
								'@import "_breakpoints"; ' +
								'@import "_mixins"; ',
						},
					},
				],
			},
		],
	},
	plugins: [
		new WebpackRTLPlugin( {
			filename: '[name]-rtl.css',
			minify: {
				safe: true,
			},
		} ),
		new MiniCssExtractPlugin( {
			filename: '[name].css',
		} ),
		new MergeExtractFilesPlugin(
			[ 'build/editor.js', 'build/style.js' ],
			'build/vendors.js'
		),
		new ProgressBarPlugin( {
			format:
				chalk.blue( 'Build' ) +
				' [:bar] ' +
				chalk.green( ':percent' ) +
				' :msg (:elapsed seconds)',
		} ),
		new DependencyExtractionWebpackPlugin( {
			injectPolyfill: true,
			requestToExternal,
			requestToHandle,
		} ),
	],
	resolve: { alias },
};

// eslint-disable-next-line no-unused-vars
const LegacyBlocksConfig = {
	...GutenbergBlocksConfig,
	output: {
		path: path.resolve( __dirname, './build/' ),
		filename: '[name]-legacy.js',
		library: [ 'wc', 'blocks', '[name]' ],
		libraryTarget: 'this',
		// This fixes an issue with multiple webpack projects using chunking
		// overwriting each other's chunk loader function.
		// See https://webpack.js.org/configuration/output/#outputjsonpfunction
		jsonpFunction: 'webpackWcBlocksJsonp',
	},
	plugins: [
		new WebpackRTLPlugin( {
			filename: '[name]-legacy.rtl.css',
			minify: {
				safe: true,
			},
		} ),
		new MiniCssExtractPlugin( {
			filename: '[name]-legacy.css',
		} ),
		new MergeExtractFilesPlugin(
			[ 'build/editor.js', 'build/style.js' ],
			'build/vendors.js'
		),
		new ProgressBarPlugin( {
			format:
				chalk.blue( 'Build' ) +
				' [:bar] ' +
				chalk.green( ':percent' ) +
				' :msg (:elapsed seconds)',
		} ),
		new DependencyExtractionWebpackPlugin( {
			injectPolyfill: true,
			requestToExternal,
			requestToHandle,
		} ),
	],
	resolve: {
		plugins: [
			new FallbackModuleDirectoryPlugin( '/legacy/', '/', {
				...alias,
				'@woocommerce/base-components': path.resolve(
					__dirname,
					'assets/js/legacy/base/components/'
				),
				'@woocommerce/base-hocs': path.resolve(
					__dirname,
					'assets/js/legacy/base/hocs'
				),
				'@woocommerce/block-components': path.resolve(
					__dirname,
					'assets/js/legacy/components/'
				),
				'@woocommerce/block-hocs': path.resolve(
					__dirname,
					'assets/js/legacy/hocs'
				),
			} ),
		],
	},
};

const BlocksFrontendConfig = {
	...baseConfig,
	entry: {
		'product-categories':
			'./assets/js/blocks/product-categories/frontend.js',
		reviews: './assets/js/blocks/reviews/frontend.js',
	},
	output: {
		path: path.resolve( __dirname, './build/' ),
		filename: '[name]-frontend.js',
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
						presets: [
							[
								'@babel/preset-env',
								{
									modules: false,
									targets: {
										browsers: [
											'extends @wordpress/browserslist-config',
										],
									},
								},
							],
						],
						plugins: [
							require.resolve(
								'@babel/plugin-proposal-object-rest-spread'
							),
							require.resolve(
								'@babel/plugin-transform-react-jsx'
							),
							require.resolve(
								'@babel/plugin-proposal-async-generator-functions'
							),
							require.resolve(
								'@babel/plugin-transform-runtime'
							),
							require.resolve(
								'@babel/plugin-proposal-class-properties'
							),
							NODE_ENV === 'production'
								? require.resolve(
										'babel-plugin-transform-react-remove-prop-types'
								  )
								: false,
						].filter( Boolean ),
					},
				},
			},
			{
				test: /\.s[c|a]ss$/,
				use: {
					loader: 'ignore-loader',
				},
			},
		],
	},
	plugins: [
		new ProgressBarPlugin( {
			format:
				chalk.blue( 'Build frontend scripts' ) +
				' [:bar] ' +
				chalk.green( ':percent' ) +
				' :msg (:elapsed seconds)',
		} ),
		new DependencyExtractionWebpackPlugin( {
			injectPolyfill: true,
			requestToExternal,
			requestToHandle,
		} ),
	],
	resolve: { alias },
};

// eslint-disable-next-line no-unused-vars
const LegacyFrontendBlocksConfig = {
	...BlocksFrontendConfig,
	output: {
		path: path.resolve( __dirname, './build/' ),
		filename: '[name]-legacy-frontend.js',
		// This fixes an issue with multiple webpack projects using chunking
		// overwriting each other's chunk loader function.
		// See https://webpack.js.org/configuration/output/#outputjsonpfunction
		jsonpFunction: 'webpackWcBlocksJsonp',
	},
	resolve: legacyAliasResolve,
};

module.exports = [
	CoreConfig,
	GutenbergBlocksConfig,
	BlocksFrontendConfig,
	// LegacyBlocksConfig,
	// LegacyFrontendBlocksConfig,
];
