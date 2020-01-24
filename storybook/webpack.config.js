/**
 * External dependencies
 */
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

/**
 * Internal dependencies
 */
const { getMainConfig } = require( '../bin/webpack-helpers.js' );

module.exports = ( { config } ) => {
	const mainConfig = getMainConfig();

	config.module.rules.push( ...mainConfig.module.rules );

	config.plugins.push(
		new MiniCssExtractPlugin( {
			filename: `[name].css`,
		} )
	);

	return config;
};
