module.exports = {
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
};
