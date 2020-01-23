const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = ( { config } ) => {
	// @todo find a way to better share webpack config betwen storybook and build
	config.module.rules.push(
		{
			test: /\/node_modules\/.*?style\.s?css$/,
			use: [
				MiniCssExtractPlugin.loader,
				{ loader: 'css-loader', options: { importLoaders: 1 } },
				'postcss-loader',
				{
					loader: 'sass-loader',
					query: {
						includePaths: [ 'node_modules' ],
						data:
							'@import "~@wordpress/base-styles/colors"; ' +
							'@import "~@wordpress/base-styles/variables"; ' +
							'@import "~@wordpress/base-styles/mixins"; ' +
							'@import "~@wordpress/base-styles/breakpoints"; ' +
							'@import "~@wordpress/base-styles/animations"; ' +
							'@import "~@wordpress/base-styles/z-index"; ',
					},
				},
			],
		},
		{
			test: /\.s?css$/,
			exclude: /node_modules/,
			use: [
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
		}
	);

	config.plugins.push(
		new MiniCssExtractPlugin( {
			filename: `[name].css`,
		} )
	);

	return config;
};
