module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
	],
	env: {
		production: {
			plugins: [ 'react-remove-prop-types' ],
		},
	},
};
