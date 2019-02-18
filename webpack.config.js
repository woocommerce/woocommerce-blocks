/**
 * External dependencies
 */
const path = require( 'path' );
const MergeExtractFilesPlugin = require( './bin/merge-extract-files-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const NODE_ENV = process.env.NODE_ENV || 'development';

const externals = {
	// We can add @woocommerce packages here when wc-admin merges into wc core,
	// for now we need to fetch those from npm.
	'@wordpress/api-fetch': { this: [ 'wp', 'apiFetch' ] },
	'@wordpress/blocks': { this: [ 'wp', 'blocks' ] },
	'@wordpress/components': { this: [ 'wp', 'components' ] },
	'@wordpress/compose': { this: [ 'wp', 'compose' ] },
	'@wordpress/data': { this: [ 'wp', 'data' ] },
	'@wordpress/element': { this: [ 'wp', 'element' ] },
	'@wordpress/editor': { this: [ 'wp', 'editor' ] },
	'@wordpress/i18n': { this: [ 'wp', 'i18n' ] },
	'@wordpress/url': { this: [ 'wp', 'url' ] },
	lodash: 'lodash',
};

function findModuleMatch( module, match ) {
	if ( module.request && match.test( module.request ) ) {
		return true;
	} else if ( module.issuer ) {
		return findModuleMatch( module.issuer, match );
	}
	return false;
}

/**
 * Config for compiling Gutenberg blocks JS.
 */
const GutenbergBlocksConfig = {
	mode: NODE_ENV,
	entry: {
		// Legacy block
		'products-block': './assets/js/legacy/products-block.jsx',
		// New blocks
		'handpicked-products': './assets/js/blocks/handpicked-products/index.js',
		'product-best-sellers': './assets/js/blocks/product-best-sellers/index.js',
		'product-category': './assets/js/blocks/product-category/index.js',
		'product-new': './assets/js/blocks/product-new/index.js',
		'product-on-sale': './assets/js/blocks/product-on-sale/index.js',
		'product-top-rated': './assets/js/blocks/product-top-rated/index.js',
		'products-attribute': './assets/js/blocks/products-by-attribute/index.js',
		'featured-product': './assets/js/blocks/featured-product/index.js',
		// Global styles
		styles: [ './assets/css/editor.scss' ],
	},
	output: {
		path: path.resolve( __dirname, './build/' ),
		filename: '[name].js',
		libraryTarget: 'this',
	},
	externals,
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
				editor: {
					// Capture all `editor` stylesheets and the components stylesheets.
					test: ( module = {} ) =>
						module.constructor.name === 'CssModule' &&
						( findModuleMatch( module, /editor\.scss$/ ) ||
							findModuleMatch( module, /[\\/]components[\\/]/ ) ),
					name: 'editor',
					chunks: 'all',
					enforce: true,
					priority: 10,
				},
				style: {
					test: /style\.scss$/,
					name: 'style',
					chunks: 'all',
					enforce: true,
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
				loader: 'babel-loader',
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
		new CleanWebpackPlugin( 'build', {} ),
		new MiniCssExtractPlugin( {
			filename: '[name].css',
		} ),
		new MergeExtractFilesPlugin( [
			'build/editor.js',
			'build/style.js',
			'build/styles.js',
		], 'build/vendors.js' ),
	],
};

module.exports = [ GutenbergBlocksConfig ];
