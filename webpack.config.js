/**
 * Internal dependencies
 */
const { NODE_ENV, getAlias } = require( './bin/webpack-helpers.js' );
const {
	getCoreConfig,
	getMainConfig,
	getFrontConfig,
	getPaymentsConfig,
	getExtensionsConfig,
	getStylingConfig,
} = require( './bin/webpack-configs.js' );

const isDevelopment = process.env.NODE_ENV !== 'production';

// Only options shared between all configs should be defined here.
const sharedConfig = {
	mode: isDevelopment ? 'development' : 'production',
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

const DevServerConfig = {
	...sharedConfig,
	devServer: {
		hot: true,
		static: './build',
		devMiddleware: {
			writeToDisk: true,
		},
	},
	optimization: {
		runtimeChunk: 'single',
	},
};

// Core config for shared libraries.
const CoreConfig = {
	...sharedConfig,
	...getCoreConfig( { alias: getAlias() } ),
};

// Main Blocks config for registering Blocks and for the Editor.
const MainConfig = {
	...sharedConfig,
	...getMainConfig( {
		alias: getAlias(),
	} ),
};

// Frontend config for scripts used in the store itself.
const FrontendConfig = {
	...sharedConfig,
	...getFrontConfig( { alias: getAlias() } ),
};

/**
 * Config for building experimental extension scripts.
 */
const ExtensionsConfig = {
	...sharedConfig,
	...getExtensionsConfig( { alias: getAlias() } ),
};

/**
 * Config for building the payment methods integration scripts.
 */
const PaymentsConfig = {
	...sharedConfig,
	...getPaymentsConfig( { alias: getAlias() } ),
};

/**
 * Config to generate the CSS files.
 */
const StylingConfig = {
	...sharedConfig,
	...getStylingConfig( { alias: getAlias() } ),
};

module.exports = [
	DevServerConfig,
	CoreConfig,
	MainConfig,
	FrontendConfig,
	ExtensionsConfig,
	PaymentsConfig,
	StylingConfig,
];

module.exports.parallelism = 1;
