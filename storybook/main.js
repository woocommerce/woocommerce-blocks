const addBlocksWebpackConfig = require( './addBlocksWebpackConfig' );

module.exports = {
	// Experimenting with different docgen options (didn't fix the issue).
	// typescript: {
	// 	// also valid 'react-docgen-typescript' | false
	// 	reactDocgen: 'react-docgen',
	// },
	stories: [
		// WooCommerce Blocks stuff (anywhere in repo!)
		'../assets/js/**/stories/*.js',
	],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-knobs',
		'@storybook/addon-storysource',
		'@storybook/addon-a11y',
		'@storybook/addon-links',
	],
	webpackFinal: addBlocksWebpackConfig,
};
