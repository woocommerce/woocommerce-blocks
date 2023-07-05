module.exports = {
	env: {
		development: {
			plugins: [
				[
					'react-docgen',
					{ DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES' },
				],
				[ '@babel/plugin-syntax-jsx' ],
				[ '@babel/plugin-proposal-optional-chaining' ],
				[ '@babel/plugin-proposal-class-properties' ],
			],
		},
	},
	presets: [
		[
			'@wordpress/babel-preset-default',
			{
				targets: {
					node: 'current',
				},
			},
		],
		[ '@babel/preset-typescript' ],
	],
};
