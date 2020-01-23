module.exports = {
	stories: [
		// starter stories from storybook - we can probably delete these
		'../stories/**/*.stories.js',
		// WooCommerce Blocks stuff (anywhere in repo!)
		'../assets/js/**/stories/*.js',
	],
	addons: [ '@storybook/addon-actions', '@storybook/addon-links' ],
};
