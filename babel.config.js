module.exports = {
	presets: [ '@wordpress/babel-preset-default' ],
	plugins: [
		[
			'@babel/transform-react-jsx',
			{
				pragma: 'createElement',
			},
		],
		[
			'@wordpress/babel-plugin-import-jsx-pragma',
			{
				scopeVariable: 'createElement',
				source: '@wordpress/element',
				isDefault: false,
			},
		],
	],
};
